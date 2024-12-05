import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

const Chartoke: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const chartOptions = {
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -26,
      },
    },
    series: [
      {
        name: 'Total Mahasiswa',
        data: [10, 50, 20, 30, 100, 1250], // Contoh data
        color: '#1A56DB',
      },
      {
        name: 'Belum Seminar',
        data: [300, 350, 400, 450, 500, 550], // Contoh data
        color: '#7E3BF2',
      },
      {
        name: 'Sudah Seminar',
        data: [700, 750, 650, 700, 700, 700], // Contoh data
        color: '#FF6347', // Warna baru untuk 'Sudah Seminar'
      },
    ],
    chart: {
      type: 'area' as 'area',
      fontFamily: 'Inter, sans-serif',
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      height: '100%', // Make the chart responsive
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    legend: {
      show: true,
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: '#1C64F2',
        gradientToColors: ['#1C64F2', '#7E3BF2', '#FF6347'],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    xaxis: {
      categories: ['January', 'February', 'Maret', 'April', 'Mei', 'Juni', 'Juli'],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        formatter: (value: number) => '' + value,
      },
    },
  };

  useEffect(() => {
    if (document.getElementById('grid-chart') && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById('grid-chart'), chartOptions);
      chart.render();
      return () => chart.destroy(); // Cleanup chart on unmount
    }
  }, []);

  return (
    <div className="flex justify-center bg-gray-100"> {/* Outer container with horizontal centering */}
      <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 flex flex-col justify-start items-start mt-10"> {/* Card container */}
        <div className="flex justify-between mb-5 w-full">
          <div>
            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">Perbandingan</h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">mahasiswa aktif dengan yang belum dan sudah seminar</p>
          </div>
          <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
            23%
            <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
            </svg>
          </div>
        </div>

        {/* Chart Component */}
        <div id="grid-chart" className="w-full flex justify-start items-start">
          <ReactApexChart options={chartOptions} series={chartOptions.series} type="area" height="100%" width="100%" />
        </div>

        <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 w-full">
          <div className="flex justify-between items-center pt-5 w-full">
            {/* Dropdown Button */}
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropdown}
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
              type="button"
            >
              Last 7 days
              <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {/* Dropdown Menu */}
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

            {/* Sales Report Link */}
            <a
              href="#"
              className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
            >
              unduh 
              <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chartoke;
