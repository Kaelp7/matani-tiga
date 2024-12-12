const ExportToCSV = ({ devices, remainingTime, formatTime }) => {
  const exportToCSV = () => {
    const headers = [
      "ID", "NAMA", "STO", "DATEL", "ID PELANGGAN", "NOMOR TOKEN",
      "JENIS METER", "JUMLAH TOKEN AWAL", "JUMLAH TOKEN TERKINI", "PENGISIAN TERAKHIR",
      "PERKIRAAN PEMAKAIAN HARIAN", "STATUS", "PERKIRAAN HABIS", "LEVEL RISK"
    ];
    const csvRows = [headers.join(';')];

    devices.forEach(device => {
      const timeUntilEmpty = remainingTime[device.id] !== undefined ? formatTime(remainingTime[device.id]) : "Tidak dapat diprediksi";
      const row = [
        device.id,
        device.nama,
        device.sto,
        device.datel,
        device.idPelanggan,
        device.nomorToken,
        device.jenisMeter,
        device.jumlahTokenawal,
        device.jumlahTokenterkini,
        device.pengecekanTerakhir,
        device.perkiraanPemakaian,
        device.status,
        timeUntilEmpty
      ];
      csvRows.push(row.join(';'));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'DataDevice.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      Export to CSV
    </button>
  );
};

export default ExportToCSV;