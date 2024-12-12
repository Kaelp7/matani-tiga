const DeviceDetails = ({ device, timeUntilEmpty, riskLevel, openModal }) => {
    return (
      <div className="flex space-x-4">
        <div className="space-y-1 transition-all max-h-100 overflow-hidden w-full md:w-1/2 lg:w-2/3">
          <p className="text-gray-700 dark:text-gray-300 flex">
            <strong>STO</strong><span className="ml-2">: {device.sto}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex">
            <strong>DATEL</strong><span className="ml-2">: {device.datel}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex">
            <strong>ID Pelanggan</strong><span className="ml-2">: {device.idPelanggan}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex">
            <strong>Nomor Token</strong><span className="ml-2">: {device.nomorToken}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex">
            <strong>Jenis Meter</strong><span className="ml-2">: {device.jenisMeter}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex">
            <strong>Jumlah Token Awal</strong><span className="ml-2">: {device.tokenAwal} kWh</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex">
            <strong>Jumlah Token Terkini</strong><span className="ml-2">: {device.jumlahToken} kWh</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex">
            <strong>Pengisian Terakhir</strong><span className="ml-2">: {device.pengecekanTerakhir}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex">
            <strong>Pemakaian Harian</strong><span className="ml-2">: {device.perkiraanPemakaian} kWh</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex">
            <strong>Status : </strong>
            <span className={`ml-2 rounded py-1 px-2 ${device.status === "Mati" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
              {device.status}
            </span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex">
            <strong>Waktu Hingga Habis : </strong>
            <span className="ml-2">{timeUntilEmpty}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex">
            <strong>Risk Level : </strong>
            <span className={`ml-2 rounded py-1 px-2 ${riskLevel === "Critical" ? "bg-red-500 text-white" : riskLevel === "Moderate" ? "bg-yellow-500 text-white" : "bg-green-500 text-white"}`}>
              {riskLevel}
            </span>
          </p>
        </div>
  
        <div className='flex flex-col md:flex-row w-full justify-end items-center'>
          {/* Gambar Sebelum */}
          <div className="flex flex-col items-center mb-4 md:mb-0">
            {device.gambarSebelum ? (
              <>
                <img 
                  src={device.gambarSebelum} 
                  alt="Gambar Sebelum" 
                  className="w-full md:w-80 md:h-80 object-cover rounded-md cursor-pointer" 
                  onClick={() => openModal(device.gambarSebelum)} // Open modal for this image
                />
                <span className='font-semibold mt-2'>Gambar Token Device Sebelum</span>
              </>
            ) : (
              <span className='font-semibold mt-2 text-gray-500'>Tidak ada Gambar Tersedia</span>
            )}
          </div>
  
          {/* Gambar Sesudah */}
          <div className="flex flex-col items-center">
            {device.gambarSesudah ? (
              <>
                <img 
                  src={device.gambarSesudah} 
                  alt="Gambar Sesudah" 
                  className="w-full md:w-80 md:h-80 object-cover rounded-md cursor-pointer ml-12" 
                  onClick={() => openModal(device.gambarSesudah)} // Open modal for this image
                />
                <span className='font-semibold mt-2 ml-12'>Gambar Token Device Sesudah</span>
              </>
            ) : (
              <span className='font-semibold mt-2 text-gray-500 ml-20'>Tidak ada Gambar Tersedia</span>
            )}
          </div>
        </div>
      </div>
    );
  };

export default DeviceDetails;