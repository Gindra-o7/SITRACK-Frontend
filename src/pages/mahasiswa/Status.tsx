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
                    <span>{item.tanggal}</span>
                  </div>
                  <h3 className="text-gray-800 font-medium mb-2">
                    {item.judul}
                  </h3>
                  <div className="text-gray-600">Lokasi: {item.lokasi}</div>
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
