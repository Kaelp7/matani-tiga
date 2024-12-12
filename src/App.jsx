import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Device from './pages/Device';
import NotFound from './pages/NotFound';
import History from './pages/History';
import Profil from './pages/Profil';
import Berita from './pages/Berita';
import Potensi from './pages/Potensi';
import Infografis from './pages/Infografis';
import Listing from './pages/Listing';
import ThemeContextProvider from './context/ThemeContextProvider';

function App() {
    const [isMinimized, setIsMinimized] = useState(false);

    return (
        <ThemeContextProvider>
            <Router>
                <div className='flex'>
                    <Sidebar isMinimized={isMinimized} toggleSidebar={() => setIsMinimized(!isMinimized)} />
                    <div className={`flex-1 transition-all duration-300 ${isMinimized ? 'ml-16' : 'ml-64'} h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white`}>
                        <div>
                            <Navbar />
                            <div>
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path ="/device" element={<Device />} />
                                    <Route path="/history" element={<History />} />
                                    <Route path="/profil" element={<Profil />} />
                                    <Route path="/berita" element={<Berita />} />
                                    <Route path="/potensi" element={<Potensi />} />
                                    <Route path="/infografis" element={<Infografis />} />
                                    <Route path="/listing" element={<Listing />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        </ThemeContextProvider>
    );
}

export default App;