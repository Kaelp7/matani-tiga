// Navbar.jsx
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContextProvider";

const Navbar = () => {
    return (
        <div className='bg-rose-600 text-gray-100 border-b border-gray-300 p-4 flex justify-between items-center shadow-md sticky top-0 z-40'>
            <div className="flex items-center space-x-3 ml-24">
                <img src="../src/assets/logo-tomohon-s.png" alt="Icon" className="w-8 h-8" />
                <h1 className="text-xl font-bold">Website Kelurahan Matani Tiga</h1>
            </div>
            <nav className="flex space-x-4 ml-48 mr-48">
                <a href="/" className="text-l hover:text-blue-600">Home</a>
                <a href="/profil" className="text-l hover:text-blue-600">Profil Kelurahan</a>
                <a href="/infografis" className="text-l hover:text-blue-600">Infografis</a>
                <a href="/listing" className="text-l hover:text-blue-600">Listing</a>
            </nav>
        </div>
    );
};

export default Navbar;