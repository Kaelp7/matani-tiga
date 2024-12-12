import { useState, useEffect } from "react";

const Profil = () => {
  return (
    <div className="grow p-8 bg-white dark:bg-gray-900">
      <main>
      <div className="flex flex-col items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Profil Kelurahan Matani Tiga</h1>
      <br></br>
      <h1 className="text-xl font-bold text-gray-600 mb-4">Visi</h1>
      <p className="text-l mb-4 text-center">MEWUJUDKAN MASYARAKAT MATANI TIGA YANG RUKUN, MAJU, SEJAHTERA SERTA MENCIPTAKAN LINGKUNGAN HIJAU, ASRI, DAN BERSIH</p>
      <br></br>
      <h1 className="text-xl font-bold text-gray-600 mb-4">Misi</h1>
      <p className="text-l mb-4 text-justify">1. Melaksanakan pelayanan yang prima dengan berdasar pada prinsip tata kepemerintahan yang baik (good governance)</p>
      <p className="text-l mb-4 text-justify">2. Memelihara stabilitas keamanan, ketertiban, dan kenyamanan di dalam masyarakat</p>
      <p className="text-l mb-4 text-justify">3. Melaksanakan pemberdayaan masyarakat sesuai dengan potensi local yang ada</p>
      <p className="text-l mb-4 text-justify">4. Mengoptimalkan tugas pokok dan fungsi aparatur kelurahan dalam menjalankan pemerintahan, pembangunan, dan pelayanan kepada masyarakat.</p>
      <br></br>
      <h1 className="text-xl font-bold text-gray-600 mb-4">Struktur Organisasi Pemerintahan Kelurahan</h1>
      <img
  src="profil-matani-tiga.png"
  alt="Struktur"
  style={{ width: '1000px', height: '1000px' }}  // Set ukuran secara inline
/>
    <br></br>
    <h1 className="text-xl font-bold text-gray-600 mb-4">Sejarah Kelurahan Matani Tiga</h1>
    <img
      src="kantor-lurah.jpg"
      alt="Kantor"
      style={{ width: '500px', height: '500px' }}  // Set ukuran secara inline
    />
    <p className="text-l text-justify ml-64 mr-64 mt-4 mb-48 pb-24"> Matani, yang merupakan bagian dari sejarah awal pemukiman di Minahasa, telah dihuni sejak zaman purba, dengan Tonaas Tololiu sebagai pemimpin awal. Pada abad ke-18, setelah gempa bumi tahun 1795, pemimpin seperti Ransun, Rosok, dan Worotikan bergerak untuk menemukan lokasi baru, yang akhirnya dinamai Tumani. Pemilihan Hukum Tua pertama di Tumani dilakukan pada tahun 1805, di mana Tololiu Palar diangkat. Seiring waktu, Matani mengalami perubahan dan penggabungan, seperti menjadi Timomor pada tahun 1921, sebelum kembali ke nama Matani pada tahun 1938. Pemekaran menjadi tiga desa terjadi pada tahun 1978, dan pada 1982, Matani Tiga ditetapkan sebagai kelurahan.  </p>
    </div>
      </main>
    </div>
  );
}

export default Profil;