import React from "react";

const Listing = () => {
  return (
    <div className="grow p-8 bg-white dark:bg-gray-900">
      <main>
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Peta Kelurahan Matani Tiga</h1>
      <br></br>       <br></br>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7977.532210580124!2d124.83891305!3d1.31589995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32876c9f35701853%3A0x715081e67ae9d341!2sMatani%20Tiga%2C%20Kec.%20Tomohon%20Tengah%2C%20Kota%20Tomohon%2C%20Sulawesi%20Utara!5e0!3m2!1sid!2sid!4v1733987784073!5m2!1sid!2sid" 
        width="600" 
        height="450" 
        style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div></main>
    </div>
  );
};

export default Listing;