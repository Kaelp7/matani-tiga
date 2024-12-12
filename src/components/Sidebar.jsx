import { Link, useLocation } from 'react-router-dom';
import { LuHistory, LuActivitySquare, LuComputer, LuDatabase, LuMonitor, LuAlignJustify } from "react-icons/lu";
import { DiGoogleDrive } from "react-icons/di";

const Sidebar = ({ isMinimized, toggleSidebar }) => {
  const location = useLocation();
  const spreadsheetId = '1We2Qlyk3uHCGWeibF1_fN60hytn1RoKGcH4SemxZidE';
  const spreadsheetLink = spreadsheetId ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit` : '';
  const gdriveID = '15F9zxOklB6pxO6WT5TYpIuGWEprp2hOm';
  const gdriveLink = spreadsheetId ? `https://drive.google.com/drive/folders/${gdriveID}?usp=sharing` : '';

  return (
    <div className={`bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 h-screen fixed ${isMinimized ? 'w-16' : 'w-64'} border-r border-gray-300 dark:border-gray-600 shadow-lg transition-all flex flex-col z-50`}>
      <div className="flex items-center justify-between bg-gray-700 dark:bg-gray-900 text-white p-[18px] shadow-md">
        <Link to="/" className={`flex items-center ${isMinimized ? 'justify-center' : ''}`}>
          {!isMinimized && (
            <>
              <img src="../src/assets/logo-tomohon-s.png" alt="Icon" className="mr-3 w-8 h-8" />
              <span className="text-xl font-bold">MATANI TIGA</span>
            </>
          )}
        </Link>
        <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
          <LuAlignJustify />
        </button>
      </div>
      <div className="flex-1 p-2">
        {/* Dashboard */}
        {!isMinimized && (
          <h2 className="text-gray-500 dark:text-gray-300 font-semibold font-mono text-sm ml-2">DASHBOARD</h2>
        )}
        <ul className="flex flex-col">
          <li className="mb-2">
            <Link 
              to="/" 
              className={`flex items-center py-3 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors ${location.pathname === '/' ? 'bg-blue-600 text-white' : 'text-gray-900 dark:text-gray-200 dark:hover:bg-blue-600'}`}
            >
              <LuActivitySquare className="text-xl" />
              {!isMinimized && <span className="ml-2 font-semibold">Overview</span>}
            </Link>
          </li>
          
          <li className="mb-2">
            <Link 
              to="/device" 
              className={`flex items-center py-3 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors ${location.pathname === '/device' ? 'bg-blue-600 text-white' : 'text-gray-900 dark:text-gray-200 dark:hover:bg-blue-600'}`}
            >
              <LuComputer className="text-xl" />
              {!isMinimized && <span className="ml-2 font-semibold">Device</span>}
            </Link>
          </li>
        </ul>

        {!isMinimized && (
          <h2 className="text-gray-500 dark:text-gray-300 font-semibold font-mono mt-4 text-sm ml-2">DATA</h2>
        )}
        <ul className="mb-2">
          <li className='mb-2'>
          <Link 
              to="/history" 
              className={`flex items-center py-3 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors ${location.pathname === '/history' ? 'bg-blue-600 text-white' : 'text-gray-900 dark:text-gray-200 dark:hover:bg-blue-600'}`}
            >
              <LuHistory className="text-xl" />
              {!isMinimized && <span className="ml-2 font-semibold">History</span>}
            </Link>
          </li>

        </ul>
      </div>

      {/* Spreadsheet Link */}
      <div className="mt-auto p-2">
        <a 
          href={gdriveLink}
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center py-3 px-4 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
        >
          <DiGoogleDrive className="text-xl" />
              {!isMinimized && <span className="ml-2 font-semibold">Google Drive</span>}
        </a>
        
        <a 
          href={spreadsheetLink}
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center py-3 px-4 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors mt-2"
        >
          <LuDatabase className="text-xl" />
              {!isMinimized && <span className="ml-2 font-semibold">Spreadsheet</span>}
        </a>
      </div>
    </div>
  );
}

export default Sidebar;