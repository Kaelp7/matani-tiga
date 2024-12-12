const HistorySortBy = ({ sortOption, setSortOption }) => (
    <div className="flex items-center">
      <span className="text-gray-600 dark:text-gray-300 mt-3 mr-2">Sort by:</span>
      <select
        value={sortOption}
        onChange={e => setSortOption(e.target.value)}
        className="border rounded py-2 px-3 text-gray-800 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-700"
      >
        {[
          { value: "none", label: "None" },
          { value: "nama_asc", label: "Nama (A-Z)" },
          { value: "nama_desc", label: "Nama (Z-A)" },
          { value: "pemakaian_harian_desc", label: "Pemakaian Harian (Terbanyak)" },
          { value: "pemakaian_harian_asc", label: "Pemakaian Harian (Terendah)" },
          { value: "perubahan_sebelumnya_terbaru", label: "Perubahan Sebelumnya (Terbaru)" },
          { value: "perubahan_sebelumnya_terdahulu", label: "Perubahan Sebelumnya (Terdahulu)" },
          { value: "tanggal_perubahan_terbaru", label: "Tanggal Perubahan (Terbaru)" },
          { value: "tanggal_perubahan_terdahulu", label: "Tanggal Perubahan (Terdahulu)" },
        ].map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
  
  export default HistorySortBy;