const HistoryExportToCSV = ({ devices }) => {
    const historyExportToCSV = () => {
      const headers = [
        "ID", "NAMA", "JUMLAH TOKEN AWAL", "JUMLAH TOKEN TERKINI", "PENGISIAN TERAKHIR", "PERKIRAAN PEMAKAIAN HARIAN", "PERUBAHAN DATA", "URL GAMBAR SEBELUM", "URL GAMBAR SESUDAH"
      ];
      const csvRows = [headers.join(';')];
  
      devices.forEach(device => {
        const row = [
          device.id,
          device.nama,
          device.jumlahTokenawal,
          device.jumlahTokenterkini,
          device.perubahanSebelumnya,
          device.perkiraanPemakaian,
          device.perubahanData,
          device.urlSebelum,
          device.urlSesudah
        ];
        csvRows.push(row.join(';'));
      });
  
      const csvString = csvRows.join('\n');
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'History.csv');
      link.style.visibility = 'hidden';
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    return (
      <button
        onClick={historyExportToCSV}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Export to CSV
      </button>
    );
  };
  
  export default HistoryExportToCSV;