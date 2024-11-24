import React from "react";
import { MoveRight } from "lucide-react";

const Status = () => {
  const riwayatSeminar = [
    {
      id: 1,
      tanggal: "Rabu, 6 November 2023",
      judul: "Pengembangan Sistem Informasi Inventaris",
      lokasi: "PT. Technology Indonesia",
    },
    {
      id: 2,
      tanggal: "Kamis, 8 Februari 2024",
      judul: "Pengembangan Sistem Informasi draf",
      lokasi: "Diskominfo",
    },
  ];

  return (
      <div>
        {/* Status Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Card 1 - Alur Selesai */}
          <div className="bg-white shadow-lg p-4 rounded-lg">
            <div className="text-gray-600 text-sm mb-1">ALUR SELESAI</div>
            <div className="text-3xl font-bold text-gray-800 mb-1">3/3</div>
            <div className="text-gray-500 text-sm">Administrasi Seminar Kp</div>
          </div>

          {/* Card 2 - Periode */}
          <div className="bg-white shadow-lg p-4 rounded-lg">
            <div className="text-gray-600 text-sm mb-1">PERIODE</div>
            <div className="text-3xl font-bold text-gray-800 mb-1">2023-2024</div>
            <div className="text-gray-500 text-sm">Ganjil</div>
          </div>

          {/* Card 3 - Sisa Waktu */}
          <div className="bg-white shadow-lg p-4 rounded-lg">
            <div className="text-gray-600 text-sm mb-1">SISA WAKTU</div>
            <div className="text-3xl font-bold text-gray-800 mb-1">20 Hari</div>
            <div className="text-gray-500 text-sm">periode ini</div>
          </div>
        </div>

        {/* Card List Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Status Riwayat Deseminasi Seminar Kerja Praktik
          </h2>
          <div className="space-y-4">
            {riwayatSeminar.map((item) => (
                <div key={item.id} className="bg-white shadow-lg rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                        <span>No. {item.id}</span>
                        <span>•</span>
                        <span>{item.tanggal}</span>
                      </div>
                      <h3 className="text-gray-800 font-medium mb-2">
                        {item.judul}
                      </h3>
                      <div className="text-gray-600">Lokasi: {item.lokasi}</div>
                    </div>
                    <div className="flex justify-end">
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                        View
                        <MoveRight className="w-4 h-4 ms-2" />
                      </button>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Status;