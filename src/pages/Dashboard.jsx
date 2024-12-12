// Dashboard.jsx
import { useState, useEffect } from "react";
import { LuAirplay, LuActivity, LuInfo } from "react-icons/lu";
import { BiSolidCircle } from "react-icons/bi";
import Card from "../components/Card";
import Search from "../components/dashboardcomponent/Search";
import RowEntries from "../components/dashboardcomponent/RowEntries";
import SortBy from "../components/dashboardcomponent/SortBy";
import RiskLevelFilter from "../components/dashboardcomponent/RiskLevelFilter";
import DeviceCharts from "../components/dashboardcomponent/DeviceCharts";
import DeviceTable from "../components/dashboardcomponent/DeviceTable";
import Tooltip from "../components/Tooltip";

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("none");
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [dataForCharts, setDataForCharts] = useState([]);
  const [remainingTime, setRemainingTime] = useState({});
  const [selectedRiskLevels, setSelectedRiskLevels] = useState(["Critical", "Moderate"]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const spreadsheetId = '1We2Qlyk3uHCGWeibF1_fN60hytn1RoKGcH4SemxZidE';

    const response = await fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`);
    const data = await response.text();
    const jsonData = JSON.parse(data.substring(47).slice(0, -2));

    const devicesData = jsonData.table.rows.map((row, index) => {
      const values = row.c.map(cell => cell?.v || "");
      return {
        id: index + 1,
        nama: values[0],
        sto: values[1],
        datel: values[2],
        idPelanggan: values[3],
        nomorToken: values[4],
        jenisMeter: values[5],
        jumlahTokenawal: (parseFloat(values[6]) || 0).toFixed(2),
        jumlahTokenterkini: (parseFloat(values[7]) || 0).toFixed(2),
        pengecekanTerakhir: values[8],
        perkiraanPemakaian: (parseFloat(values[9]) || 0).toFixed(2),
        status: values[10],
      };
    });

    setDevices(devicesData);
    const initialRemainingTime = calculateRemainingTime(devicesData);
    setRemainingTime(initialRemainingTime);
    setDataForCharts(prepareChartData(devicesData));
  };

  const calculateRemainingTime = (devicesData) => {
    const initialRemainingTime = {};
    devicesData.forEach(device => {
      const totalSeconds = calculateInitialTime(device.jumlahTokenterkini, device.perkiraanPemakaian);
      if (totalSeconds !== null) {
        initialRemainingTime[device.id] = totalSeconds;
      }
    });
    return initialRemainingTime;
  };

  const prepareChartData = (devicesData) =>
    devicesData.map(device => ({
      name: device.nama,
      penggunaanHarian: parseFloat(device.perkiraanPemakaian) || 0,
      token: parseFloat(device.jumlahTokenterkini) || 0,
    }));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => {
        const newRemaining = {};
        Object.keys(prev).forEach(deviceId => {
          const device = devices.find(d => d.id === parseInt(deviceId));
          const secondsLeft = prev[deviceId];

          newRemaining[deviceId] = device.status === "Mati" ? secondsLeft : Math.max(secondsLeft - 1, 0);
        });
        return newRemaining;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [devices]);

  const formatTime = (seconds) => {
    if (seconds === "Habis") return seconds;

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.round(seconds % 60);

    return `${days} Hari ${hours} Jam ${minutes} Menit ${secs} Detik`;
  };

  const calculateTotalUsage = (isHourly) => {
    return devices.reduce((total, device) => {
      if (device.status === "Hidup") {
        const usage = parseFloat(device.perkiraanPemakaian) || 0;
        return total + (isHourly ? usage / 24 : usage);
      }
      return total;
    }, 0).toFixed(2);
  };

  const totalPenggunaanPerJam = calculateTotalUsage(true);
  const totalPenggunaanPerHarian = calculateTotalUsage(false);

  const calculateInitialTime = (jumlahTokenterkini, perkiraanPemakaian) => {
    const dailyUsage = parseFloat(perkiraanPemakaian) || 0;
    return (dailyUsage === 0 || jumlahTokenterkini <= 0) ? null : (jumlahTokenterkini / dailyUsage) * 24 * 3600;
  };

  const getRiskLevel = (seconds) => {
    if (seconds === "Habis") return "Critical";
    const days = Math.floor(seconds / 86400);
    return (days <= 3 && "Critical") || (days <= 9 && "Moderate") || (days >= 10 && "Low") || "Critical";
  };

  const [tooltipTimeout, setTooltipTimeout] = useState(null);

  const handleMouseEnter = (type, e) => {
    clearTimeout(tooltipTimeout); // Hentikan timeout sebelumnya
    setShowTooltip(true);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    const deviceNames = devices.filter(device => {
      const timeLeft = remainingTime[device.id];
      if (type === "kritis") return timeLeft === undefined || timeLeft < 4 * 86400;
      if (type === "moderate") return timeLeft >= 4 * 86400 && timeLeft <= 10 * 86400;
      return timeLeft > 10 * 86400;
    }).map(device => device.nama).join('\n');
    setTooltipMessage(deviceNames);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowTooltip(false);
    }, 50); // Tooltip akan tetap muncul selama 1 detik setelah mouse meninggalkan
    setTooltipTimeout(timeout);
  };

  const filteredDevices = devices.filter(device => {
    const riskLevel = getRiskLevel(remainingTime[device.id]);
    return (
      Object.values(device).some(value => value.toString().toLowerCase().includes(searchQuery.toLowerCase())) &&
      selectedRiskLevels.includes(riskLevel)
    );
  });

  const sortedDevices = filteredDevices.sort((a, b) => {
    const aTime = remainingTime[a.id] !== undefined ? remainingTime[a.id] : Infinity;
    const bTime = remainingTime[b.id] !== undefined ? remainingTime[b.id] : Infinity;

    const sortFunctions = {
      nama_asc: () => a.nama.localeCompare(b.nama),
      nama_desc: () => b.nama.localeCompare(a.nama),
      tanggal_diubah_terbaru: () => b.pengecekanTerakhir.localeCompare(a.pengecekanTerakhir),
      tanggal_diubah_terdahulu: () => a.pengecekanTerakhir.localeCompare(b.pengecekanTerakhir),
      pemakaian_harian_desc: () => parseFloat(b.perkiraanPemakaian) - parseFloat(a.perkiraanPemakaian),
      pemakaian_harian_asc: () => parseFloat(a.perkiraanPemakaian) - parseFloat(b.perkiraanPemakaian),
      perkiraan_habis_tercepat: () => {
        return (aTime === Infinity && bTime === Infinity && 0) ||(aTime === Infinity && -1) ||(bTime === Infinity && 1) ||(aTime - bTime);
      },
      perkiraan_habis_terlama: () => {
        return (aTime === Infinity && bTime === Infinity && 0) ||(aTime === Infinity && 1) ||(bTime === Infinity && -1) ||(bTime - aTime);
      },
    };

    return sortFunctions[sortOption] ? sortFunctions[sortOption]() : 0;
  });

  return (
    <div className="grow bg-gray-100 dark:bg-gray-900">
      <main>
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold text-gray-700">Selamat Datang</h2>
            <p className="mt-2 text-gray-600">
              Sumber informasi terbaru tentang pemerintahan di Kelurahan Matani Tiga.
            </p>
          </div>
        </section>

        <section className="py-6 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h3 className="text-lg font-bold text-gray-800">Jelajahi Kelurahan</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <a href="/profil" className="p-4 border rounded-lg shadow-sm">
        <h4 className="font-semibold">Profil Kelurahan</h4>
        <p className="text-gray-600">Informasi lengkap tentang Kelurahan Matani Tiga.</p>
      </a>
      <a href="/berita" className="p-4 border rounded-lg shadow-sm">
        <h4 className="font-semibold">Infografis</h4>
        <p className="text-gray-600">Menyajikan informasi terbaru tentang peristiwa di Kelurahan.</p>
      </a>
      <a href="/potensi" className="p-4 border rounded-lg shadow-sm">
        <h4 className="font-semibold">Peta Kelurahan</h4>
        <p className="text-gray-600">Informasi tentang potensi Kelurahan di berbagai bidang.</p>
      </a>
    </div>
    <br></br>      <br></br>    

    <h1 className="text-lg font-bold text-gray-800 mb-4">Jumlah Penduduk</h1>
          <table className="min-w-200 border-collapse border border-gray-300 mb-4">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Jumlah Kepala Keluarga</td>
                <td className="border border-gray-300 p-2">708</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Jumlah Penduduk</td>
                <td className="border border-gray-300 p-2">3369</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Penduduk Laki-laki</td>
                <td className="border border-gray-300 p-2">1478</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Penduduk Perempuan</td>
                <td className="border border-gray-300 p-2">1891</td>
              </tr>
            </tbody>
          </table>
          <br></br>      <br></br>      


    <h1 className="text-lg font-bold text-gray-800 mb-4">Peta Kelurahan Matani Tiga</h1>
      <br></br>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7977.532210580124!2d124.83891305!3d1.31589995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32876c9f35701853%3A0x715081e67ae9d341!2sMatani%20Tiga%2C%20Kec.%20Tomohon%20Tengah%2C%20Kota%20Tomohon%2C%20Sulawesi%20Utara!5e0!3m2!1sid!2sid!4v1733987784073!5m2!1sid!2sid" 
        width="600" 
        height="450" 
        style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
  </div>
</section>

        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-gray-800">Kontak</h3>
            <p className="mt-2 text-gray-600">Jl. Tololiu, Matani Tiga, Kec. Tomohon Tengah, Kota Tomohon, Sulawesi Utara</p>
            <p className="mt-1 text-gray-600">Email: emaildesa@digitaldesa.id</p>
            <p className="mt-1 text-gray-600">Telepon: 08xxxxxxxxxx</p>
          </div>
        </section>
      </main>
      <footer className="bg-gray-200 py-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          © 2024 Powered by KKT-141 UNSRAT
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;