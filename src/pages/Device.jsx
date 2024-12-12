import { useState, useEffect } from "react";
import DeviceCard from "../components/devicecomponent/DeviceCard";
import DeviceSearch from "../components/devicecomponent/DeviceSearch";
import DeviceSortBy from "../components/devicecomponent/DeviceSortBy";
import Card from "../components/Card";
import { BiSolidCircle } from "react-icons/bi";
import { LuAirplay, LuInfo } from "react-icons/lu";
import Tooltip from "../components/Tooltip";

const Device = () => {
  const [devices, setDevices] = useState([]);
  const [openDeviceId, setOpenDeviceId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("None");
  const [remainingTime, setRemainingTime] = useState({});
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const spreadsheetId = '1We2Qlyk3uHCGWeibF1_fN60hytn1RoKGcH4SemxZidE';

    try {
      const response = await fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`);
      const data = await response.text();
      const jsonData = JSON.parse(data.substring(47).slice(0, -2));

      const devicesData = jsonData.table.rows.map((row, index) => {
        const values = row.c.map((cell) => cell?.v || "");
        return {
          id: index + 1,
          nama: values[0],
          sto: values[1],
          datel: values[2],
          idPelanggan: values[3],
          nomorToken: values[4],
          jenisMeter: values[5],
          tokenAwal: (parseFloat(values[6]) || 0).toFixed(2),
          jumlahToken: parseFloat(values[7]) || 0,
          pengecekanTerakhir: values[8],
          perkiraanPemakaian: parseFloat(values[9]) || 0,
          status: values[10],
          gambarSebelum: values[14],
          gambarSesudah: values[15],
        };
      });
      setDevices(devicesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    const initialRemainingTime = {};
    devices.forEach(device => {
      const totalSeconds = calculateInitialTime(device.jumlahToken, device.perkiraanPemakaian);
      if (totalSeconds !== null) {
        initialRemainingTime[device.id] = totalSeconds;
      }
    });
    setRemainingTime(initialRemainingTime);
  }, [devices]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => {
        const newRemaining = {};
        Object.keys(prev).forEach(deviceId => {
          const device = devices.find(d => d.id === parseInt(deviceId));
          const secondsLeft = prev[deviceId];

          if (device.status === "Mati") {
            newRemaining[deviceId] = secondsLeft; // Tetap tidak berubah
          } else {
            const updatedSeconds = secondsLeft - 1;
            newRemaining[deviceId] = updatedSeconds <= 0 ? "Habis" : updatedSeconds;
          }
        });
        return newRemaining;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [devices]);

  const calculateInitialTime = (jumlahToken, perkiraanPemakaian) => {
    const dailyUsage = parseFloat(perkiraanPemakaian) || 0;
    return (dailyUsage === 0 || jumlahToken <= 0) ? null : (jumlahToken / dailyUsage) * 24 * 3600;
  };

  const toggleDevice = (id) => {
    setOpenDeviceId(openDeviceId === id ? null : id);
  };

  const formatTime = (seconds) => {
    if (seconds === "Habis") return seconds;

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.round(seconds % 60);

    return `${days} Hari ${hours} Jam ${minutes} Menit ${secs} Detik`;
  };

  const filteredDevices = devices.filter(device =>
    device.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDevices = [...filteredDevices].sort((a, b) => {
    const aTime = remainingTime[a.id] !== undefined ? remainingTime[a.id] : Infinity;
    const bTime = remainingTime[b.id] !== undefined ? remainingTime[b.id] : Infinity;
  
    return (
      (filterOption === "Jumlah Token (Terbanyak)" && (b.jumlahToken - a.jumlahToken)) ||
      (filterOption === "Jumlah Token (Terendah)" && (a.jumlahToken - b.jumlahToken)) ||
      (filterOption === "perkiraan_habis_tercepat" && (aTime === Infinity && bTime === Infinity ? 0 :aTime === Infinity ? -1 :bTime === Infinity ? 1 : aTime - bTime)) ||
      (filterOption === "perkiraan_habis_terlama" && (aTime === Infinity && bTime === Infinity ? 0 :aTime === Infinity ? 1 :bTime === Infinity ? -1 : bTime - aTime)) || 0
    );
  });

  const getRiskLevel = (seconds) => {
    if (seconds === "Habis") return "Critical";
    const days = Math.floor(seconds / 86400);
    return (days <= 3 && "Critical") || (days <= 9 && "Moderate") || (days >= 10 && "Low") || "Critical";
  };

  const handleMouseEnter = (type, e) => {
    setShowTooltip(true);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    const deviceNames = devices.filter(device => {
      const timeLeft = remainingTime[device.id];
      if (type === "kritis") return timeLeft === undefined || timeLeft === Infinity || timeLeft < 4 * 86400;
      if (type === "moderate") return timeLeft >= 4 * 86400 && timeLeft <= 10 * 86400;
      return timeLeft > 10 * 86400;
    }).map(device => device.nama).join('\n');
    setTooltipMessage(deviceNames);
  };

  return (
    <div className="grow p-8 bg-gray-100 dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card icon={<LuAirplay className="text-gray-800 dark:text-gray-400" />} title={<span className="text-gray-700 dark:text-gray-300">Jumlah Device Total</span>} value={devices.length} />
        <div className="relative flex flex-col min-h-[150px]">
          <Card icon={<BiSolidCircle className="text-red-600 blink" />} title={<span className="text-red-500">Device Critical</span>} value={devices.filter(device => remainingTime[device.id] === undefined || remainingTime[device.id] === Infinity || remainingTime[device.id] < 4 * 86400).length} 
          className="border-2 border-red-500 border-blink"
          />
          <button className="absolute top-0 right-0 p-1 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300" onMouseEnter={e => handleMouseEnter("kritis", e)} onMouseLeave={() => setShowTooltip(false)}><LuInfo /></button>
        </div>
        <div className="relative flex flex-col min-h-[150px]">
          <Card icon={<BiSolidCircle className="text-yellow-500 blink2" />} title={<span className="text-yellow-500">Device Moderate</span>} value={devices.filter(device => remainingTime[device.id] >= 4 * 86400 && remainingTime[device.id] <= 10 * 86400).length} />
          <button className="absolute top-0 right-0 p-1 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300" onMouseEnter={e => handleMouseEnter("moderate", e)} onMouseLeave={() => setShowTooltip(false)}><LuInfo /></button>
        </div>
        <div className="relative flex flex-col min-h-[150px]">
          <Card icon={<BiSolidCircle className="text-green-600" />} title={<span className="text-green-500">Device Low</span>} value={devices.filter(device => remainingTime[device.id] > 10 * 86400).length} />
          <button className="absolute top-0 right-0 p-1 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300" onMouseEnter={e => handleMouseEnter("low", e)} onMouseLeave={() => setShowTooltip(false)}><LuInfo /></button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Daftar Device</h3>
        <div className="ml-auto flex items-center">
          <DeviceSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <DeviceSortBy filterOption={filterOption} setFilterOption={setFilterOption} />
        </div>
      </div>
      {sortedDevices.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">Tidak ada device tersedia</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-8">
          {sortedDevices.map(device => {
            const timeUntilEmpty = remainingTime[device.id] !== undefined ? formatTime(remainingTime[device.id]) : "Tidak dapat diprediksi";
            const riskLevel = getRiskLevel(remainingTime[device.id]);
            return (
              <DeviceCard 
                key={device.id} 
                device={device} 
                isOpen={openDeviceId === device.id} 
                toggleDevice={toggleDevice} 
                timeUntilEmpty={timeUntilEmpty} 
                riskLevel={riskLevel} 
                remainingTime={remainingTime}
              />
            );
          })}
        </div>
      )}
      {showTooltip && <Tooltip message={tooltipMessage} position={tooltipPosition} />}
    </div>
  );
};

export default Device;