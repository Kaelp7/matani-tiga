const Tooltip = ({ message, position }) => (
  <div
    className="absolute bg-gray-200 dark:bg-gray-600 bg-opacity-80 text-black dark:text-white p-2 rounded shadow-lg z-10"
    style={{ top: position.y, left: position.x - 150 }}
  >
    <span style={{ whiteSpace: 'pre-line' }}>{message}</span>
  </div>
);

export default Tooltip;