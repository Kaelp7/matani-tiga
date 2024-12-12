import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'; // Import icons
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
import ImageModal from './ImageModal'; // Adjust the path if necessary
import { useState } from 'react';
import DeviceDetails from './DeviceDetails';

const DeviceCard = ({ device, isOpen, toggleDevice, timeUntilEmpty, riskLevel, remainingTime }) => {
  const seconds = remainingTime[device.id];
  const borderColor = 
    seconds === undefined || seconds === Infinity || seconds < 4 * 86400 ? "border-red-500" : // Critical
    seconds >= 4 * 86400 && seconds <= 10 * 86400 ? "border-yellow-500" : // Moderate
    seconds > 10 * 86400 ? "border-green-500" : // Low
    "border-gray-300";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openModal = (imageSrc) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  return (
    <>
      <div className={`border rounded-lg shadow-md p-4 bg-white dark:bg-gray-800 transition-shadow duration-300 hover:shadow-lg ${borderColor}`}>
        <h4 
          className={`text-lg font-semibold mb-2 cursor-pointer flex justify-between items-center ${isOpen ? 'border-b-2 border-gray-400' : ''}`} 
          onClick={() => toggleDevice(device.id)}
        >
          {device.nama}
          {isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </h4>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DeviceDetails 
                device={device} 
                timeUntilEmpty={timeUntilEmpty} 
                riskLevel={riskLevel} 
                openModal={openModal} // Pass the openModal function
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal for full-size image */}
      {isModalOpen && <ImageModal src={currentImage} alt="Device Image" onClose={closeModal} />}
    </>
  );
};

export default DeviceCard;