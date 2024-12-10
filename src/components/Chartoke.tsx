import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResponsiveChartComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chartData, setChartData] = useState([
    { name: 'January', 'Total Mahasiswa': 10, 'Belum Seminar': 300, 'Sudah Seminar': 700 },
    { name: 'February', 'Total Mahasiswa': 50, 'Belum Seminar': 350, 'Sudah Seminar': 750 },
    { name: 'Maret', 'Total Mahasiswa': 20, 'Belum Seminar': 400, 'Sudah Seminar': 650 },
    { name: 'April', 'Total Mahasiswa': 30, 'Belum Seminar': 450, 'Sudah Seminar': 700 },
    { name: 'Mei', 'Total Mahasiswa': 100, 'Belum Seminar': 500, 'Sudah Seminar': 700 },
    { name: 'Juni', 'Total Mahasiswa': 1250, 'Belum Seminar': 550, 'Sudah Seminar': 700 },
    { name: 'Juli', 'Total Mahasiswa': 0, 'Belum Seminar': 0, 'Sudah Seminar': 0 },
  ]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      {/* Sales Info Section */}
      <div className="flex justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white pb-2">Perbandingan Mahasiswa</h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">Aktif, Belum Seminar, dan Sudah Seminar</p>
        </div>
        <div className="flex items-center px-3 py-1 text-base font-semibold text-green-500 dark:text-green-500 text-center">
          23%
          <svg className="w-4 h-4 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
          </svg>
        </div>
      </div>

      {/* Chart Component */}
      <div className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} padding={{ left: 16, right: 16 }} />
            <YAxis tickLine={false} axisLine={false} type="number" domain={[0, 'dataMax']} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: '14px', fontWeight: 'medium', color: 'gray' }} />
            <Line type="monotone" dataKey="Total Mahasiswa" stroke="#1A56DB" strokeWidth={3} />
            <Line type="monotone" dataKey="Belum Seminar" stroke="#7E3BF2" strokeWidth={3} />
            <Line type="monotone" dataKey="Sudah Seminar" stroke="#FF6347" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Dropdown and Download Section */}
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-6">
        <div className="flex justify-between items-center pt-6 w-full">
          <button
            onClick={toggleDropdown}
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button"
          >
            Last 7 days
            <svg className="w-4 h-4 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div id="lastDaysdropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
                </li>
              </ul>
            </div>
          )}

          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
          >
            Download
            <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveChartComponent;