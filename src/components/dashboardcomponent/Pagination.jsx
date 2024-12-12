const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {

      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
    
      if (currentPage < 4) {
  
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
      } else if (currentPage > totalPages - 3) {

        pageNumbers.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {

        pageNumbers.push('...');
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          if (i > 0 && i <= totalPages) {
            pageNumbers.push(i);
          }
        }
        pageNumbers.push('...');
      }
    }

    return pageNumbers;
  };

  const pageNumbers = renderPageNumbers();

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageNumbers.map((number, index) => (
        <button
          key={index}
          onClick={() => typeof number === 'number' && handlePageChange(number)}
          className={`px-4 py-2 mx-1 rounded ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-600 text-blue-500 dark:text-white'}`}
          disabled={number === '...'}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-sky-500'}`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;