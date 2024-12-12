import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, BarChart, Bar } from 'recharts';

const DeviceCharts = ({ dataForCharts }) => {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
      <div className="flex flex-wrap justify-between mb-6">
        <div className="w-full md:w-1/2 p-2">
          <h3 className="text-xl font-semibold mb-3 mt-3 ml-3">Penggunaan Harian</h3>
          <LineChart width={500} height={250} data={dataForCharts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(27, 27, 27, 0.8)', color: '#FFFFFF' }} />
            <Legend />
            <Line dataKey="penggunaanHarian" stroke="#29C5F6" />
          </LineChart>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <h3 className="text-xl font-semibold mb-3 mt-3 ml-3">Token Device</h3>
          <BarChart width={500} height={250} data={dataForCharts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(27, 27, 27, 0.8)', color: '#FFFFFF' }} />
            <Legend />
            <Bar dataKey="token" fill="#74B72E" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default DeviceCharts;