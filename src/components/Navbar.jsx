// Navbar.jsx
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaMoon, FaSun, FaCalendar } from "react-icons/fa";
import { LuActivitySquare, LuComputer, LuHistory } from "react-icons/lu";
import { ThemeContext } from "../context/ThemeContextProvider";
import CalendarComponent from './CalendarComponent';

const Navbar = ({ onDataFetched }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const location = useLocation();
    const [devices, setDevices] = useState([]);
    const [remainingTime, setRemainingTime] = useState({});
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        const spreadsheetId = '1We2Qlyk3uHCGWeibF1_fN60hytn1RoKGcH4SemxZidE';

        const response = await fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`);
        const data = await response.text();
        const jsonData = JSON.parse(data.substring(47).slice(0, -2));

        const devicesData = jsonData.table.rows.map((row, index) => {
            const values = row.c.map(cell => cell?.v || "");
            return {
                id: index + 1,
                nama: values[0],
                sto: values[1],
                datel: values[2],
                idPelanggan: values[3],
                nomorToken: values[4],
                jenisMeter: values[5],
                jumlahTokenawal: (parseFloat(values[6]) || 0).toFixed(2),
                jumlahTokenterkini: (parseFloat(values[7]) || 0).toFixed(2),
                pengecekanTerakhir: values[8],
                perkiraanPemakaian: (parseFloat(values[9]) || 0).toFixed(2),
                status: values[10],
            };
        });

        setDevices(devicesData);
        const initialRemainingTime = calculateRemainingTime(devicesData);
        setRemainingTime(initialRemainingTime);

        if (onDataFetched) {
            onDataFetched(devicesData, initialRemainingTime); // Call the callback if provided
        }
    };

    const calculateRemainingTime = (devicesData) => {
        const initialRemainingTime = {};
        devicesData.forEach(device => {
            const totalSeconds = calculateInitialTime(device.jumlahTokenterkini, device.perkiraanPemakaian);
            if (totalSeconds !== null) {
                initialRemainingTime[device.id] = totalSeconds;
            }
        });
        return initialRemainingTime;
    };

    const calculateInitialTime = (jumlahTokenterkini, perkiraanPemakaian) => {
        const dailyUsage = parseFloat(perkiraanPemakaian) || 0;
        return (dailyUsage === 0 || jumlahTokenterkini <= 0) ? null : (jumlahTokenterkini / dailyUsage) * 24 * 3600;
    };

    const getPageTitleAndIcon = () => {
        switch (location.pathname) {
            case "/":
                return { title: "Overview", icon: <LuActivitySquare /> };
            case "/device":
                return { title: "Device", icon: <LuComputer /> };
            case "/history":
                return { title: "History", icon: <LuHistory /> };
            default:
                return { title: "404 - Page Not Found", icon: null };
        }
    };

    const { title, icon } = getPageTitleAndIcon();

    return (
        <div className='bg-gray-50 text-gray-700 border-b border-gray-300 p-4 flex justify-between items-center shadow-md sticky top-0 z-40'>
            <div className="flex items-center space-x-3">
                <img src="../src/assets/logo-tomohon-s.png" alt="Icon" className="w-8 h-8" />
                <h1 className="text-xl font-bold">Website Kelurahan Matani Tiga</h1>
            </div>
            <nav className="flex space-x-4">
                <a href="/" className="text-l hover:text-blue-600">Home</a>
                <a href="/profil" className="text-l hover:text-blue-600">Profil Kelurahan</a>
                <a href="/infografis" className="text-l hover:text-blue-600">Infografis</a>
                <a href="/listing" className="text-l hover:text-blue-600">Listing</a>
                <a href="/berita" className="text-l hover:text-blue-600">Berita</a>
            </nav>
            <button 
                className='text-2xl py-1 px-2' 
                onClick={toggleTheme}
            >
                {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
        </div>
    );
};

export default Navbar;