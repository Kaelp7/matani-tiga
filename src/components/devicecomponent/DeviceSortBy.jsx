const DeviceSortBy = ({ filterOption, setFilterOption }) => {
  return (
    <div className="flex items-center">
      <span className="ml-4 text-gray-700 dark:text-gray-300">Sort By:</span>
      <select
        className="ml-2 p-2 border rounded border-gray-300 dark:text-gray-300 dark:bg-gray-950 dark:border-gray-800"
        value={filterOption}
        onChange={(e) => setFilterOption(e.target.value)} 
      >
        <option value="None">None</option>
        <option value="Jumlah Token (Terbanyak)">Jumlah Token (Terbanyak)</option>
        <option value="Jumlah Token (Terendah)">Jumlah Token (Terendah)</option>
        <option value="perkiraan_habis_tercepat">Perkiraan Habis Tercepat</option>
        <option value="perkiraan_habis_terlama">Perkiraan Habis Terlama</option>
      </select>
    </div>
  );
};

export default DeviceSortBy;