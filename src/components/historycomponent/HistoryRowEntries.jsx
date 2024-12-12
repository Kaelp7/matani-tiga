const HistoryRowEntries = ({ itemsPerPage, setItemsPerPage }) => (
  <div className="flex">
    <span className="text-gray-600 dark:text-gray-300 mt-3 mr-2">Tampilkan</span>
    <select
      value={itemsPerPage}
      onChange={e => setItemsPerPage(Number(e.target.value))}
      className="border rounded py-2 px-3 text-gray-800 dark:text-gray-300 mr-4 dark:bg-gray-900 dark:border-gray-700"
    >
      {[5, 10, 25, 50].map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default HistoryRowEntries;