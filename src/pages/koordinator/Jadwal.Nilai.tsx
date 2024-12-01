import React, { useState, useMemo } from "react";
import { Pencil, Trash2, ChevronUp, ChevronDown, Search } from "lucide-react";
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
    {
      id: 3,
      tanggal: "2024-11-27",
      waktu: "10:00",
      mahasiswa: "Candra Wijaya",
      judul:
        "Analisis Sentimen Media Sosial Menggunakan Natural Language Processing",
      nilai: {
        pembimbing: 87,
        penguji: 89,
        pembimbingInstansi: 85,
      },
    },
    {
      id: 4,
      tanggal: "2024-11-27",
      waktu: "14:00",
      mahasiswa: "Diana Putri",
      judul: "Pengembangan Aplikasi Mobile untuk Monitoring Kesehatan",
      nilai: {
        pembimbing: 92,
        penguji: 88,
        pembimbingInstansi: 90,
      },
    },
    {
      id: 5,
      tanggal: "2024-11-28",
      waktu: "09:30",
      mahasiswa: "Eko Prasetyo",
      judul: "Sistem Keamanan IoT Berbasis Blockchain",
      nilai: {
        pembimbing: 88,
        penguji: 86,
        pembimbingInstansi: 89,
      },
    },
    {
      id: 6,
      tanggal: "2024-11-28",
      waktu: "13:00",
      mahasiswa: "Fitri Handayani",
      judul: "Optimasi Database menggunakan Algoritma Genetika",
      nilai: {
        pembimbing: 89,
        penguji: 91,
        pembimbingInstansi: 87,
      },
    },
    {
      id: 7,
      tanggal: "2024-11-29",
      waktu: "10:30",
      mahasiswa: "Gatot Subroto",
      judul: "Implementasi Deep Learning untuk Deteksi Objek Real-Time",
      nilai: {
        pembimbing: 93,
        penguji: 90,
        pembimbingInstansi: 92,
      },
    },
    {
      id: 8,
      tanggal: "2024-11-29",
      waktu: "15:00",
      mahasiswa: "Hana Susanti",
      judul: "Pengembangan Chatbot menggunakan Natural Language Understanding",
      nilai: {
        pembimbing: 86,
        penguji: 88,
        pembimbingInstansi: 85,
      },
    },
    {
      id: 9,
      tanggal: "2024-11-30",
      waktu: "09:00",
      mahasiswa: "Irfan Hakim",
      judul: "Analisis Performa Web Service menggunakan Load Testing",
      nilai: {
        pembimbing: 88,
        penguji: 87,
        pembimbingInstansi: 90,
      },
    },
    {
      id: 10,
      tanggal: "2024-11-30",
      waktu: "13:30",
      mahasiswa: "Jenny Kusuma",
      judul: "Implementasi Augmented Reality untuk Media Pembelajaran",
      nilai: {
        pembimbing: 91,
        penguji: 89,
        pembimbingInstansi: 88,
      },
    },
  ]);

  // New states for sorting, searching, and pagination
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sorting function
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filtered and sorted data
  const filteredAndSortedData = useMemo(() => {
    let filtered = jadwalList.filter(
      (item) =>
        item.mahasiswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tanggal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.waktu.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (sortConfig.key === "nilai") {
          const nilaiA = hitungNilaiAkhir(a.nilai);
          const nilaiB = hitungNilaiAkhir(b.nilai);
          return sortConfig.direction === "asc"
            ? nilaiA - nilaiB
            : nilaiB - nilaiA;
        }

        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [jadwalList, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Your existing functions remain the same
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

  // Existing handlers remain the same
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
      setJadwalList(
        jadwalList.map((jadwal) =>
          jadwal.id === editingJadwal.id
            ? { ...jadwal, ...formData, id: jadwal.id }
            : jadwal
        )
      );
    } else {
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

  // Sort indicator component
  const SortIndicator = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronUp className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 text-blue-500" />
    ) : (
      <ChevronDown className="w-4 h-4 text-blue-500" />
    );
  };

  return (
    <div className="p-6 bg-gray-50">
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

      {/* Search Bar */}
      <div className="mb-4 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari mahasiswa atau judul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg"
          />
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Tabel Jadwal */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Daftar Jadwal</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("tanggal")}
                >
                  <div className="flex items-center">
                    Tanggal
                    <SortIndicator columnKey="tanggal" />
                  </div>
                </th>
                <th
                  className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("waktu")}
                >
                  <div className="flex items-center">
                    Waktu
                    <SortIndicator columnKey="waktu" />
                  </div>
                </th>
                <th
                  className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("mahasiswa")}
                >
                  <div className="flex items-center">
                    Mahasiswa
                    <SortIndicator columnKey="mahasiswa" />
                  </div>
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
              {paginatedData.map((jadwal) => (
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

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)}{" "}
            dari {filteredAndSortedData.length} data
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((curr) => Math.max(curr - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((curr) => Math.min(curr + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Card Penilaian section remains the same */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Detail Penilaian</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedData.map((jadwal) => (
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

      {/* Modal remains the same */}
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
