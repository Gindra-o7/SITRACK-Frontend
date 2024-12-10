import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResponsiveChartComponent = () => {
  const [chartData, setChartData] = useState([
    { name: 'Januari', 'Pengajuan Seminar': 150, 'Selesai Seminar': 100 },
    { name: 'Februari', 'Pengajuan Seminar': 141, 'Selesai Seminar': 13 },
    { name: 'Maret', 'Pengajuan Seminar': 145, 'Selesai Seminar': 65 },
    { name: 'April', 'Pengajuan Seminar': 152, 'Selesai Seminar': 152 },
    { name: 'Mei', 'Pengajuan Seminar': 135, 'Selesai Seminar': 42 },
    { name: 'Juni', 'Pengajuan Seminar': 125, 'Selesai Seminar': 73 },
    { name: 'Juli', 'Pengajuan Seminar': 0, 'Selesai Seminar': 0 },
  ]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4">
      {/* Sales Info Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Perbandingan</h3>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Pengajuan Seminar dengan Selesai Seminar</p>
        </div>
        <div className="bg-green-500 dark:bg-green-600 text-white px-2 py-1 text-sm font-medium rounded">23%</div>
      </div>

      {/* Chart Container - Centered */}
      <div className="flex justify-center items-center">
        <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'medium', color: 'gray' }} />
            <Line type="monotone" dataKey="Pengajuan Seminar" stroke="#1A56DB" strokeWidth={3} />
            <Line type="monotone" dataKey="Selesai Seminar" stroke="#7E3BF2" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Dropdown and Download Section */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
          type="button"
        >
          Last 7 days
          <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
        <a
          href="#"
          className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
        >
          UNDUH
          <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ResponsiveChartComponent;