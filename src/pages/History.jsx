
import { useState, useEffect } from "react";
import HistorySearch from "../components/historycomponent/HistorySearch";
import HistoryRowEntries from "../components/historycomponent/HistoryRowEntries";
import HistorySortBy from "../components/historycomponent/HistorySortBy";
import HistoryTable from "../components/historycomponent/HistoryTable";

const History = () => {
  const [devices, setDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("none");

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const spreadsheetId = '1We2Qlyk3uHCGWeibF1_fN60hytn1RoKGcH4SemxZidE';
    const gid = '1528898700';

    const response = await fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&gid=${gid}`);
    const data = await response.text();
    const jsonData = JSON.parse(data.substring(47).slice(0, -2));

    const devicesData = jsonData.table.rows.map((row, index) => {
      const values = row.c.map(cell => cell?.v || "");
      return {
        id: index + 1,
        nama: values[0],
        jumlahTokenawal: (parseFloat(values[5]) || 0).toFixed(2),
        jumlahTokenterkini: (parseFloat(values[6]) || 0).toFixed(2),
        perubahanSebelumnya: values[7],
        perkiraanPemakaian: (parseFloat(values[8]) || 0).toFixed(2),
        perubahanData: values[9],
        urlSebelum: values[10],
        urlSesudah: values[11],
      };
    });

    setDevices(devicesData);
  };

  const filteredDevices = devices.filter(device => {
    return (
      Object.values(device).some(value => value.toString().toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const sortedDevices = filteredDevices.sort((a, b) => {
    const sortFunctions = {
      nama_asc: () => a.nama.localeCompare(b.nama),
      nama_desc: () => b.nama.localeCompare(a.nama),
      pemakaian_harian_desc: () => parseFloat(b.perkiraanPemakaian) - parseFloat(a.perkiraanPemakaian),
      pemakaian_harian_asc: () => parseFloat(a.perkiraanPemakaian) - parseFloat(b.perkiraanPemakaian),
      perubahan_sebelumnya_terbaru: () => b.perubahanSebelumnya.localeCompare(a.perubahanSebelumnya),
      perubahan_sebelumnya_terdahulu: () => a.perubahanSebelumnya.localeCompare(b.perubahanSebelumnya),
      tanggal_perubahan_terbaru: () => b.perubahanData.localeCompare(a.perubahanData),
      tanggal_perubahan_terdahulu: () => a.perubahanData.localeCompare(b.perubahanData)
    };

    return sortFunctions[sortOption] ? sortFunctions[sortOption]() : 0;
  });

  return (
    <div className="grow p-8 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <h3 className="text-black-200 text-xl font-semibold mt-6 ml-6">History Perubahan Data</h3>
        <div className="p-6 text-gray-900 dark:text-gray-100">
          <div className="flex mb-4 mt-6 justify-between">
            <div className="flex">
              <HistorySearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <HistoryRowEntries itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
            </div>
            <HistorySortBy sortOption={sortOption} setSortOption={setSortOption} />
          </div>

          {/* DeviceTable Component */}
          <HistoryTable 
            devices={sortedDevices}
            currentPage={currentPage} 
            itemsPerPage={itemsPerPage} 
            setCurrentPage={setCurrentPage} 
          />
        </div>
      </div>
    </div>
  );
};

export default History;
