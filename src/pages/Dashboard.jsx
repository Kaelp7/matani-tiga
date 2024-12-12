// Dashboard.jsx
import { useState, useEffect } from "react";

const Dashboard = () => {
  return (
    <div className="grow bg-gray-100 dark:bg-gray-900">
      <main>
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-red-950">Selamat Datang</h2>
            <p className="mt-2 text-gray-600">
              Sumber informasi tentang pemerintahan di Kelurahan Matani Tiga.
            </p>
          </div>
        </section>

        <section className="py-6 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h3 className="text-lg font-bold text-gray-800">Jelajahi Kelurahan</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <a href="/profil" className="p-4 border rounded-lg shadow-sm hover:bg-red-200">
        <h4 className="font-semibold">Profil Kelurahan</h4>
        <p className="text-gray-600">Informasi tentang Kelurahan Matani Tiga.</p>
      </a>
      <a href="/berita" className="p-4 border rounded-lg shadow-sm hover:bg-red-200">
        <h4 className="font-semibold">Infografis</h4>
        <p className="text-gray-600">Informasi tentang statistik kependudukan di Kelurahan.</p>
      </a>
      <a href="/potensi" className="p-4 border rounded-lg shadow-sm hover:bg-red-200">
        <h4 className="font-semibold">Peta Kelurahan</h4>
        <p className="text-gray-600">Menyajikan informasi terkait wilayah Kelurahan Matani Tiga.</p>
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
    <h1 className="text-m text-gray-800 mb-4">Menampilkan Peta Kelurahan Matani Tiga</h1>
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

        <section className="py-10 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-gray-800">Kontak</h3>
            <p className="mt-2 text-gray-600">Jl. Tololiu, Matani Tiga, Kec. Tomohon Tengah, Kota Tomohon, Sulawesi Utara</p>
            <p className="mt-1 text-gray-600">Email: emaildesa@digitaldesa.id</p>
            <p className="mt-1 text-gray-600">Telepon: 08xxxxxxxxxx</p>
          </div>
        </section>
      </main>
      <footer className="bg-red-100 py-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          © 2024 Powered by KKT-141 UNSRAT
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;