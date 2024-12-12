import Pagination from '../historycomponent/HistoryPagination';
import ExportToCSV from '../historycomponent/HistoryExportToCSV';

const HistoryTable = ({ devices, currentPage, itemsPerPage, setCurrentPage}) => {
  const totalPages = Math.ceil(devices.length / itemsPerPage);
  const paginatedDevices = devices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto">
      <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200 border-b-2 border-gray-500">
        <thead className="text-1xl text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border-b-2 border-gray-500">
          <tr>
            {["ID", "NAMA", "JUMLAH TOKEN AWAL", "JUMLAH TOKEN TERKINI", "PERUBAHAN SEBELUMNYA", "PERKIRAAN PEMAKAIAN HARIAN" ,"PERUBAHAN DATA", "URL GAMBAR SEBELUM", "URL GAMBAR SESUDAH"].map(header => (
              <th key={header} className="px-3 py-3 text-center">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-gray-200 dark:bg-gray-900">
          {paginatedDevices.length === 0 ? (
            <tr>
              <td colSpan="12" className="text-center py-4 text-gray-700 dark:text-gray-300">Masukkan GID terlebih dahulu</td>
            </tr>
          ) : (
            paginatedDevices.map(device => {
              return (
                <tr key={device.id} className="border-b border-gray-300 dark:border-gray-700" style={{ height: '60px' }}>
                  <td className="text-center">{device.id}</td>
                  <td className="text-center">{device.nama}</td>
                  <td className="text-center">{device.jumlahTokenawal} kWh</td>
                  <td className="text-center">{device.jumlahTokenterkini} kWh</td>
                  <td className="text-center">{device.perubahanSebelumnya}</td>
                  <td className="text-center">{device.perkiraanPemakaian} kWh</td>
                  <td className="text-center">{device.perubahanData}</td>
                  <td className="text-center">
                    <button 
                      onClick={() => {
                        if (!device.urlSebelum) {
                          alert("No Image");
                        } else {
                          window.open(device.urlSebelum, "_blank");
                        }
                      }} 
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 dark:bg-blue-700 dark:hover:bg-blue-800"
                    >
                      Download
                    </button>
                  </td>
                  <td className="text-center">
                    <button 
                      onClick={() => {
                        if (!device.urlSesudah) {
                          alert("No Image");
                        } else {
                          window.open(device.urlSesudah, "_blank");
                        }
                      }} 
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 dark:bg-blue-700 dark:hover:bg-blue-800"
                    >
                      Download
                    </button>
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
        />
      </div>
      <div className="text-center mt-2">
        <span className="text-gray-600 dark:text-gray-400 mr-13">Halaman {currentPage} dari {totalPages}</span>
      </div>
    </div>
  );
};

export default HistoryTable;