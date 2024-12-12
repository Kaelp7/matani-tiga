import { useState, useEffect, useRef } from 'react';
const RiskLevelFilter = ({ selectedRiskLevels, setSelectedRiskLevels }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const riskLevels = ["Critical", "Moderate", "Low"];
  const dropdownRef = useRef(null);

  const toggleRiskLevel = (level) => {
    const newSelected = selectedRiskLevels.includes(level)
      ? selectedRiskLevels.filter(selected => selected !== level)
      : [...selectedRiskLevels, level];
    setSelectedRiskLevels(newSelected);
    if (newSelected.length === 0) {
      setInputValue('Select a Risk Level');
    } else {
      setInputValue(newSelected.join(', '));
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks outside
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <input 
        type="text" 
        placeholder="Critical, Moderate" 
        value={inputValue} 
        readOnly 
        onFocus={handleInputFocus} 
        className="border rounded-md p-2 w-full text-gray-700 dark:text-gray-300 cursor-pointer placeholder-gray-700 dark:placeholder-gray-400 dark:bg-gray-900 dark:border-gray-700"
      />
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 dark:border-gray-700 rounded-md shadow-md z-10">
          {riskLevels.map(level => (
            <label key={level} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer text-gray-700 dark:text-gray-300 dark:bg-gray-900">
              <input
                type="checkbox"
                value={level}
                checked={selectedRiskLevels.includes(level)}
                onChange={() => toggleRiskLevel(level)} // Toggle the risk level
                className="mr-2"
              />
              {level}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiskLevelFilter;