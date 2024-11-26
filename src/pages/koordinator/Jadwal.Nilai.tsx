import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import TambahJadwal from "../../components/Modal/TambahJadwal";

const JadwalNilai = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJadwal, setEditingJadwal] = useState(null);
  const [jadwalList, setJadwalList] = useState([
    {
      id: 1,
      tanggal: "2024-11-25",
      waktu: "09:00",
      mahasiswa: "Budi Santoso",
      judul: "Pengembangan Sistem Informasi Akademik",
      nilai: {
        pembimbing: 85,
        penguji: 88,
        pembimbingInstansi: 90,
      },
    },
    {
      id: 2,
      tanggal: "2024-11-26",
      waktu: "13:30",
      mahasiswa: "Ani Wijaya",
      judul: "Implementasi Machine Learning untuk Prediksi Cuaca",
      nilai: {
        pembimbing: 90,
        penguji: 85,
        pembimbingInstansi: 88,
      },
    },
  ]);

  const hitungNilaiAkhir = (nilai) => {
    const bobotPembimbing = 0.4;
    const bobotPenguji = 0.3;
    const bobotpembimbingInstansi = 0.3;

    return (
      nilai.pembimbing * bobotPembimbing +
      nilai.penguji * bobotPenguji +
      nilai.pembimbingInstansi * bobotpembimbingInstansi
    ).toFixed(2);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) {
      setJadwalList(jadwalList.filter((jadwal) => jadwal.id !== id));
    }
  };

  const handleEdit = (jadwal) => {
    setEditingJadwal(jadwal);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    if (editingJadwal) {
      // Update existing jadwal
      setJadwalList(
        jadwalList.map((jadwal) =>
          jadwal.id === editingJadwal.id
            ? { ...jadwal, ...formData, id: jadwal.id }
            : jadwal
        )
      );
    } else {
      // Add new jadwal
      const newJadwal = {
        id: jadwalList.length + 1,
        ...formData,
        nilai: {
          pembimbing: 0,
          penguji: 0,
          pembimbingInstansi: 0,
        },
      };
      setJadwalList([...jadwalList, newJadwal]);
    }
    setIsModalOpen(false);
    setEditingJadwal(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Jadwal & Nilai Seminar KP</h1>
        <button
          onClick={() => {
            setEditingJadwal(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <span className="mr-2">+</span>
          Tambah Jadwal
        </button>
      </div>

      {/* Tabel Jadwal */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Daftar Jadwal</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waktu
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mahasiswa
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Judul
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jadwalList.map((jadwal) => (
                <tr key={jadwal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(jadwal.tanggal).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {jadwal.waktu}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {jadwal.mahasiswa}
                  </td>
                  <td className="px-6 py-4">{jadwal.judul}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(jadwal)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(jadwal.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card Penilaian */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Detail Penilaian</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jadwalList.map((jadwal) => (
            <div
              key={jadwal.id}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow transition-shadow border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <div className="flex-grow">
                  <div className="text-base font-semibold mb-1">
                    {jadwal.mahasiswa}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{jadwal.judul}</p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Pembimbing</p>
                      <p className="font-semibold">{jadwal.nilai.pembimbing}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Penguji</p>
                      <p className="font-semibold">{jadwal.nilai.penguji}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Pembimbing Instansi</p>
                      <p className="font-semibold">
                        {jadwal.nilai.pembimbingInstansi}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-4 text-center bg-blue-50 px-4 py-2 rounded">
                  <p className="text-xs text-gray-600">Nilai Akhir</p>
                  <p className="text-xl font-bold text-blue-600">
                    {hitungNilaiAkhir(jadwal.nilai)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => {
                setIsModalOpen(false);
                setEditingJadwal(null);
              }}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <TambahJadwal
                onSubmit={handleSave}
                initialData={editingJadwal}
                onClose={() => {
                  setIsModalOpen(false);
                  setEditingJadwal(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JadwalNilai;
