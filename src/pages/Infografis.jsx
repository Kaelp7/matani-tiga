import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  Rectangle,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Infografis = () => {
  const datausia = [
    { name: '0-4', Perempuan: 4000, Laki_laki: 2400 },
    { name: '5-9', Perempuan: 3000, Laki_laki: 1398 },
    { name: '10-14', Perempuan: 2000, Laki_laki: 9800 },
    { name: '15-19', Perempuan: 2780, Laki_laki: 3908 },
    { name: '20-24', Perempuan: 1890, Laki_laki: 4800 },
    { name: '25-29', Perempuan: 2390, Laki_laki: 3800 },
    { name: '30-34', Perempuan: 3490, Laki_laki: 4300 },
    { name: '35-39', Perempuan: 4000, Laki_laki: 2400 },
    { name: '40-44', Perempuan: 4000, Laki_laki: 2400 },
    { name: '45-49', Perempuan: 4000, Laki_laki: 2400 },
    { name: '50-54', Perempuan: 4000, Laki_laki: 2400 },
    { name: '55-59', Perempuan: 4000, Laki_laki: 2400 },
    { name: '60-64', Perempuan: 4000, Laki_laki: 2400 },
    { name: '65-69', Perempuan: 4000, Laki_laki: 2400 },
    { name: '70-74', Perempuan: 4000, Laki_laki: 2400 },
    { name: '75-79', Perempuan: 4000, Laki_laki: 2400 },
    { name: '80-84', Perempuan: 4000, Laki_laki: 2400 },
    { name: '85+', Perempuan: 4000, Laki_laki: 2400 },
  ];

  const totalPerempuan = datausia.reduce((acc, curr) => acc + curr.Perempuan, 0);
  const totalLakiLaki = datausia.reduce((acc, curr) => acc + curr.Laki_laki, 0);
  const totalpenduduk = totalPerempuan + totalLakiLaki;

  const dataprofesi = [
    { name: 'Tani', profesi: 25 },
    { name: 'Wiraswasta', profesi: 25 },
    { name: 'Tukang', profesi: 20 },
    { name: 'Karyawan Swasta', profesi: 15 },
    { name: 'PNS', profesi: 5 },
    { name: 'Buruh Harian', profesi: 5 },
    { name: 'Lainnya', profesi: 5 },
  ];

  const totalprofesi = dataprofesi.reduce((acc, curr) => acc + curr.profesi, 0);

  const datapendidikan = [
    {
      name: 'Lulusan SD',
      jumlah: 33,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Lulusan SMP',
      jumlah: 70,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Lulusan SMA',
      jumlah: 250,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Strata Satu',
      jumlah: 107,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Strata Dua',
      jumlah: 50,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Strata Tiga',
      jumlah: 3,
      pv: 3800,
      amt: 2500,
    },
  ];

  const datawilayah = [
    { name: 'Luas Pemukiman', Luas: 202},
    { name: 'Luas Perkebunan', Luas: 153},
    { name: 'Luas Persawahan', Luas: 15},
    { name: 'Luas Pekarangan', Luas: 15},
  ];

  return (
    <div className="grow p-8 bg-white dark:bg-gray-900">
      <main>
        <div className="flex flex-col items-center h-screen">
          <h1 className="text-2xl font-bold mb-4">Infografis Kelurahan Matani Tiga</h1>
          <br></br>          <br></br>          
          <h1 className="text-xl font-bold text-gray-600 mb-4">Jumlah Penduduk</h1>
          <table className="min-w-200 border-collapse border border-gray-300 mb-4">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Jumlah Kepala Keluarga</td>
                <td className="border border-gray-300 p-2">708</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Jumlah Penduduk</td>
                <td className="border border-gray-300 p-2">3369</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Penduduk Laki-laki</td>
                <td className="border border-gray-300 p-2">1478</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Penduduk Perempuan</td>
                <td className="border border-gray-300 p-2">1891</td>
              </tr>
            </tbody>
          </table>
          <br></br>          <br></br>          <br></br>
          <h1 className="text-xl font-bold text-gray-600 mb-4">Tingkat Pendidikan</h1>
          <ResponsiveContainer width="50%" height={400}>
            <BarChart
              data={datapendidikan}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
          </ResponsiveContainer>
          <br></br>          <br></br>          <br></br>


          <h1 className="text-xl font-bold text-gray-600 mb-4">Data Profesi</h1>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="profesi"
                isAnimationActive={false}
                data={dataprofesi}
                cx="50%"
                cy="50%"
                outerRadius={150}  // Ubah nilai ini untuk memperbesar ukuran pie chart
                fill="#8884d8"
                label={({ name, profesi }) => `${name}: ${(profesi / totalprofesi * 100).toFixed(2)}%`}
              >
                {dataprofesi.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 50}, 70%, 50%)`} />
                ))}
              </Pie>
              <Tooltip formatter={(profesi) => `${(profesi / totalprofesi * 100).toFixed(2)}%`} />
            </PieChart>
          </ResponsiveContainer>
          <br></br>          <br></br>          <br></br>

          <h1 className="text-xl font-bold text-gray-600 mb-4">Luas Wilayah</h1>

          <ResponsiveContainer width="50%" height={400}>
            <BarChart
              data={datawilayah}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Luas" fill="#60a5fa" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

export default Infografis;