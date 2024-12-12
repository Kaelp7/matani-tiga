const DeviceSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search devices..."
      className="p-2 border rounded border-gray-300 dark:border-gray-800 w-64 text-gray-700 dark:text-gray-300 dark:bg-gray-950"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} 
    />
  );
};

export default DeviceSearch;