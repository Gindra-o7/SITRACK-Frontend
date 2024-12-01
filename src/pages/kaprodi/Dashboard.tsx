import React from "react";
import ChartCard from "../../components/ChartCard";
import ChartWidget from "../../components/ChartWidget";
import ChartPSB from "../../components/ChartPSB";
import Chartprapasca from "../../components/Chartprapasca";
import Chartsat from "../../components/Chartsat";
import Tablelok from "../../components/Tablelok";
import SelectionTable from "../../components/SelectionTable";
import { ApexOptions } from "apexcharts";

// Chart Options untuk Real-Time (Area Chart)
const realTimeChartOptions: ApexOptions = {
  chart: {
    height: 500,
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: { enabled: false },
    toolbar: { show: false },
  },
  tooltip: { enabled: true },
  fill: {
    type: "gradient",
    gradient: { opacityFrom: 0.55, opacityTo: 0 },
  },
  stroke: { width: 6 },
  xaxis: {
    categories: ["01 Nov", "02 Nov", "03 Nov", "04 Nov", "05 Nov", "06 Nov"],
  },
  yaxis: { show: false },
};

const realTimeChartSeries = [
  { name: "Selesai Seminar", data: [11, 2, 4, 2, 1, 1] },
];

// Komponen Dashboard
const DashboardKaprodi: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <main className="p-6 flex-1">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Selamat Datang Kaprodi, Iwan Iskandar, M.Kom
          </h2>
          <p className="text-lg text-gray-500">
            Berikut Data Terkini Mengenai Seminar Kerja Praktek Prodi Teknik
            Informatika
          </p>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white shadow-lg rounded-lg p-4 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm">Total Tahap Persyaratan</p>
            <h2 className="text-2xl font-bold mt-1">3</h2>
            <p className="text-blue-500 text-sm mt-2">Mahasiswa</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm">Total Tahap Pendaftaran</p>
            <h2 className="text-2xl font-bold mt-1">10</h2>
            <p className="text-yellow-500 text-sm mt-2">Mahasiswa</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm">Total Tahap Pasca-Seminar</p>
            <h2 className="text-2xl font-bold mt-1">19</h2>
            <p className="text-green-500 text-sm mt-2">Mahasiswa</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm">Total Selesai Seminar</p>
            <h2 className="text-2xl font-bold mt-1">21</h2>
            <p className="text-purple-500 text-sm mt-2">Mahasiswa</p>
          </div>
        </div>

        {/* Chart Section - Horizontal Layout */}
        <div className="flex flex-wrap gap-6 mb-8">
          {/* Real-Time Selesai Seminar Chart */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <ChartCard
              title="Real-Time"
              description="Selesai Seminar Terkini"
              chartOptions={realTimeChartOptions}
              chartSeries={realTimeChartSeries}
              height={400}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <ChartPSB />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <ChartWidget />
          </div>
        </div>

        {/* Additional Charts and Tables */}
        <div className="flex flex-wrap gap-6 mb-8">
          <div className="w-full sm:w-1/2 lg:w-1/1">
            <Chartsat />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4">
            <Tablelok />
          </div>
        </div>

        {/* Selection Table and Prapasca Chart */}
        <div className="flex flex-wrap gap-6">
          <div className="w-full sm:w-1/2 lg:w-1/4">
            <SelectionTable />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4">
            <Chartprapasca />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardKaprodi;
