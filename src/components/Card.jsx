const Card = ({ icon, title, value, className }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 text-dark p-4 rounded-lg shadow-md flex items-center space-x-6 min-h-[150px] ${className}`}>
      <div className="text-3xl text-gray-500">{icon}</div>
      <div className="flex flex-col justify-center flex-grow">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default Card;