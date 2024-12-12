import Pagination from './Pagination';
import ExportToCSV from './ExportToCSV';

const DeviceTable = ({ devices, remainingTime, currentPage, itemsPerPage, setCurrentPage, formatTime }) => {
  const totalPages = Math.ceil(devices.length / itemsPerPage);
  const paginatedDevices = devices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getRiskLevel = (seconds) => {
    if (seconds === "Habis") return "Critical";
    const days = Math.floor(seconds / 86400);
    return (days <= 3 && "Critical") || (days <= 9 && "Moderate") || (days >= 10 && "Low") || "Critical";
  };

  const getRiskLevelClass = (seconds) => {
    const level = getRiskLevel(seconds);
    return (level === "Critical" && "bg-red-500 text-white") ||(level === "Moderate" && "bg-yellow-500 text-white") ||(level === "Low" && "bg-green-500 text-white") || "";
  };

  return (
    <div className="container mx-auto">
      <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200 border-b-2 border-gray-500">
        <thead className="text-1xl text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border-b-2 border-gray-500">
          <tr>
            {["ID", "NAMA", "STO", "DATEL", "ID PELANGGAN", "NOMOR TOKEN", "JENIS METER", "JUMLAH TOKEN AWAL", "JUMLAH TOKEN TERKINI", "PENGISIAN TERAKHIR", "PERKIRAAN PEMAKAIAN HARIAN", "STATUS", "PERKIRAAN HABIS", "LEVEL RISK"].map(header => (
              <th key={header} className="px-3 py-3 text-center">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-gray-200 dark:bg-gray-900">
          {paginatedDevices.length === 0 ? (
            <tr>
              <td colSpan="12" className="text-center py-4 text-gray-700 dark:text-gray-300">Tidak ada Device yang Tersedia</td>
            </tr>
          ) : (
            paginatedDevices.map(device => {
              const timeLeft = remainingTime[device.id] !== undefined ? formatTime(remainingTime[device.id]) : "Tidak dapat diprediksi";
              const riskClass = getRiskLevelClass(remainingTime[device.id]);
              return (
                <tr key={device.id} className="border-b border-gray-300 dark:border-gray-700" style={{ height: '60px' }}>
                  <td className="text-center">{device.id}</td>
                  <td className="text-center">{device.nama}</td>
                  <td className="text-center">{device.sto}</td>
                  <td className="text-center">{device.datel}</td>
                  <td className="text-center">{device.idPelanggan}</td>
                  <td className="text-center">{device.nomorToken}</td>
                  <td className="text-center">{device.jenisMeter}</td>
                  <td className="text-center">{device.jumlahTokenawal} kWh</td>
                  <td className="text-center">{device.jumlahTokenterkini} kWh</td>
                  <td className="text-center">{device.pengecekanTerakhir}</td>
                  <td className="text-center">{device.perkiraanPemakaian} kWh</td>
                  <td className="text-center">
                    <span className={`rounded py-1 px-2 ${device.status === "Mati" ? "bg-red-500 text-white dark:bg-red-600" : "bg-green-500 text-white dark:bg-green-600"}`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="text-left relative">{timeLeft}</td>
                  <td className="text-center">
                    <span className={`rounded py-1 px-2 ${riskClass}`}>
                      {getRiskLevel(remainingTime[device.id])}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-3">
        <div className="flex-grow text-center ml-12">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
        <ExportToCSV
          devices={devices}
          remainingTime={remainingTime}
          formatTime={formatTime}
        />
      </div>
      <div className="text-center mt-2">
        <span className="text-gray-600 dark:text-gray-400 mr-13">Halaman {currentPage} dari {totalPages}</span>
      </div>
    </div>
  );
};

export default DeviceTable;