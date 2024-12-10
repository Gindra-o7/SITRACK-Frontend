import React from "react";
import ChartWidget from "../../components/ChartWidget";
import ChartPSB from "../../components/ChartPSB";
import Chartsat from "../../components/Chartsat";
import SelectionTable from "../../components/SelectionTable";
import Chartoke from "../../components/Chartoke";
import Jadwal from "../../pages/jadwal";  

const DashboardKaprodi: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
  <main className="p-4 sm:p-6 lg:p-8 flex-1">
    {/* Header Section */}
    <div className="mb-6 sm:mb-8 text-center sm:text-left">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
        Selamat Datang Kaprodi, Iwan Iskandar, M.Kom
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-500 mt-2">
        Berikut Data Terkini Mengenai Seminar Kerja Praktek Prodi Teknik Informatika
      </p>
    </div>

    {/* Stats Cards Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* Kartu Statistik */}
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 border-l-4 border-blue-500">
        <p className="text-xs sm:text-sm text-gray-600">Total Tahap Persyaratan</p>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-1">3</h2>
        <p className="text-blue-500 text-xs sm:text-sm mt-2">Mahasiswa</p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 border-l-4 border-yellow-500">
        <p className="text-xs sm:text-sm text-gray-600">Total Tahap Pendaftaran</p>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-1">10</h2>
        <p className="text-yellow-500 text-xs sm:text-sm mt-2">Mahasiswa</p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 border-l-4 border-green-500">
        <p className="text-xs sm:text-sm text-gray-600">Total Tahap Pasca-Seminar</p>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-1">19</h2>
        <p className="text-green-500 text-xs sm:text-sm mt-2">Mahasiswa</p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 border-l-4 border-purple-500">
        <p className="text-xs sm:text-sm text-gray-600">Total Selesai Seminar</p>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-1">21</h2>
        <p className="text-purple-500 text-xs sm:text-sm mt-2">Mahasiswa</p>
      </div>
    </div>

    {/* Chart Section */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-6 sm:mb-8">
      {/* Jadwal Chart */}
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <Jadwal />
      </div>

      {/* Widget Chart */}
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <ChartWidget />
      </div>
    </div>

    {/* Additional Charts */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-6 sm:mb-8">
      {/* Chartsat */}
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <Chartsat />
      </div>

      {/* ChartPSB */}
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <ChartPSB />
      </div>
    </div>

    {/* Selection Table and Prapasca Chart */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-6 sm:mb-8">
      {/* Selection Table */}
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <SelectionTable />
      </div>

      {/* Chartoke */}
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <Chartoke />
      </div>
    </div>
  </main>
</div>

  );
};

export default DashboardKaprodi;