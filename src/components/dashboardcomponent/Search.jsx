const Search = ({ searchQuery, setSearchQuery }) => (
  <input
    type="text"
    placeholder="Search..."
    value={searchQuery}
    onChange={e => setSearchQuery(e.target.value)}
    className="border rounded py-2 px-3 mr-4 text-gray-800 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-700"
  />
);

export default Search;