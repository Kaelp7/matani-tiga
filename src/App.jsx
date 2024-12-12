import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Profil from './pages/Profil';
import Infografis from './pages/Infografis';
import Listing from './pages/Listing';
import ThemeContextProvider from './context/ThemeContextProvider';

function App() {
    const [isMinimized] = useState(false);

    return (
        <ThemeContextProvider>
            <Router>
                <div className='flex'>
                    <div className={`flex-1 transition-all duration-300 ${isMinimized ? '' : ''} h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white`}>
                        <div>
                            <Navbar />
                            <div>
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/profil" element={<Profil />} />
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