import { useState, useMemo } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import TambahJadwal from "../../modal/TambahJadwal";

const JadwalNilaiTabs = () => {
  const [activeTab, setActiveTab] = useState("jadwal");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [jadwalList, setJadwalList] = useState([
    {
      id: 1,
      tanggal: "2024-06-15",
      waktu: "09:00 - 10:00",
      mahasiswa: "Ahmad Rifqi",
      judul: "Analisis Sistem ERP",
      ruangan: "GB301",
      dosenPenguji: "Dr. Andi M.T.",
    },
    {
      id: 2,
      tanggal: "2024-06-16",
      waktu: "10:00 - 11:00",
      mahasiswa: "Siti Nurhaliza",
      judul: "Machine Learning Prediksi Cuaca",
      ruangan: "GB302",
      dosenPenguji: "Dr. Ikfa S.T",
    },
    {
      id: 3,
      tanggal: "2024-06-17",
      waktu: "13:00 - 14:00",
      mahasiswa: "Budi Santoso",
      judul: "Optimasi AI Sorting",
      ruangan: "GB303",
      dosenPenguji: "Dr. Retno S.Kom",
    },
    {
      id: 4,
      tanggal: "2024-06-18",
      waktu: "11:00 - 12:00",
      mahasiswa: "Dewi Kurniawati",
      judul: "IoT untuk Monitoring Rumah",
      ruangan: "GB304",
      dosenPenguji: "Dr. Budi Haryanto M.T.",
    },
    {
      id: 5,
      tanggal: "2024-06-19",
      waktu: "08:00 - 09:00",
      mahasiswa: "Eko Saputra",
      judul: "Mobile Finance Management",
      ruangan: "GB305",
      dosenPenguji: "Prof. Hartono S.T.",
    },
    {
      id: 6,
      tanggal: "2024-06-20",
      waktu: "10:00 - 11:00",
      mahasiswa: "Lina Rahmawati",
      judul: "Analisis Penggunaan Big Data",
      ruangan: "GB306",
      dosenPenguji: "Dr. Andi M.T.",
    },
    {
      id: 7,
      tanggal: "2024-06-21",
      waktu: "13:00 - 14:00",
      mahasiswa: "Rahmat Pratama",
      judul: "Kinerja Aplikasi Real-Time",
      ruangan: "GB307",
      dosenPenguji: "Dr. Ikfa S.T",
    },
    {
      id: 8,
      tanggal: "2024-06-22",
      waktu: "08:00 - 09:00",
      mahasiswa: "Sri Handayani",
      judul: "Sistem Blockchain untuk Logistik",
      ruangan: "GB308",
      dosenPenguji: "Dr. Retno S.Kom",
    },
    {
      id: 9,
      tanggal: "2024-06-23",
      waktu: "11:00 - 12:00",
      mahasiswa: "Miko Anggara",
      judul: "AI untuk Deteksi Objek",
      ruangan: "GB309",
      dosenPenguji: "Dr. Budi Haryanto M.T.",
    },
    {
      id: 10,
      tanggal: "2024-06-24",
      waktu: "09:00 - 10:00",
      mahasiswa: "Sari Oktavia",
      judul: "Mobile App untuk E-Commerce",
      ruangan: "GB310",
      dosenPenguji: "Prof. Hartono S.T.",
    },
    {
      id: 11,
      tanggal: "2024-06-25",
      waktu: "10:00 - 11:00",
      mahasiswa: "Andi Pratama",
      judul: "Perancangan Database Distribusi",
      ruangan: "GB311",
      dosenPenguji: "Dr. Andi M.T.",
    },
    {
      id: 12,
      tanggal: "2024-06-26",
      waktu: "13:00 - 14:00",
      mahasiswa: "Nina Lestari",
      judul: "Analisis Keamanan Jaringan",
      ruangan: "GB312",
      dosenPenguji: "Dr. Ikfa S.T",
    },
    {
      id: 13,
      tanggal: "2024-06-27",
      waktu: "08:00 - 09:00",
      mahasiswa: "Bayu Saputra",
      judul: "Implementasi AR di Pendidikan",
      ruangan: "GB313",
      dosenPenguji: "Dr. Retno S.Kom",
    },
    {
      id: 14,
      tanggal: "2024-06-28",
      waktu: "11:00 - 12:00",
      mahasiswa: "Dina Rahmah",
      judul: "IoT Smart Agriculture",
      ruangan: "GB314",
      dosenPenguji: "Dr. Budi Haryanto M.T.",
    },
    {
      id: 15,
      tanggal: "2024-06-29",
      waktu: "09:00 - 10:00",
      mahasiswa: "Arief Hidayat",
      judul: "AI dalam Diagnosis Medis",
      ruangan: "GB315",
      dosenPenguji: "Prof. Hartono S.T.",
    },
  ]);

  const [nilaiList, setNilaiList] = useState([
    {
      id: 1,
      mahasiswa: "Ahmad Rifqi",
      judul: "Analisis Sistem ERP",
      pembimbing: 85,
      penguji: 82,
      pembimbingInstansi: 87,
    },
    {
      id: 2,
      mahasiswa: "Siti Nurhaliza",
      judul: "Machine Learning Prediksi Cuaca",
      pembimbing: 90,
      penguji: 86,
      pembimbingInstansi: 92,
    },
    {
      id: 3,
      mahasiswa: "Budi Santoso",
      judul: "Optimasi AI Sorting",
      pembimbing: 78,
      penguji: 80,
      pembimbingInstansi: 85,
    },
    {
      id: 4,
      mahasiswa: "Dewi Kurniawati",
      judul: "IoT untuk Monitoring Rumah",
      pembimbing: 88,
      penguji: 83,
      pembimbingInstansi: 89,
    },
    {
      id: 5,
      mahasiswa: "Eko Saputra",
      judul: "Mobile Finance Management",
      pembimbing: 92,
      penguji: 88,
      pembimbingInstansi: 95,
    },
    {
      id: 6,
      mahasiswa: "Lina Rahmawati",
      judul: "Analisis Penggunaan Big Data",
      pembimbing: 84,
      penguji: 81,
      pembimbingInstansi: 86,
    },
    {
      id: 7,
      mahasiswa: "Rahmat Pratama",
      judul: "Kinerja Aplikasi Real-Time",
      pembimbing: 89,
      penguji: 85,
      pembimbingInstansi: 91,
    },
    {
      id: 8,
      mahasiswa: "Sri Handayani",
      judul: "Sistem Blockchain untuk Logistik",
      pembimbing: 79,
      penguji: 77,
      pembimbingInstansi: 80,
    },
    {
      id: 9,
      mahasiswa: "Miko Anggara",
      judul: "AI untuk Deteksi Objek",
      pembimbing: 87,
      penguji: 84,
      pembimbingInstansi: 88,
    },
    {
      id: 10,
      mahasiswa: "Sari Oktavia",
      judul: "Mobile App untuk E-Commerce",
      pembimbing: 90,
      penguji: 86,
      pembimbingInstansi: 93,
    },
    {
      id: 11,
      mahasiswa: "Andi Pratama",
      judul: "Perancangan Database Distribusi",
      pembimbing: 83,
      penguji: 80,
      pembimbingInstansi: 85,
    },
    {
      id: 12,
      mahasiswa: "Nina Lestari",
      judul: "Analisis Keamanan Jaringan",
      pembimbing: 86,
      penguji: 82,
      pembimbingInstansi: 87,
    },
    {
      id: 13,
      mahasiswa: "Bayu Saputra",
      judul: "Implementasi AR di Pendidikan",
      pembimbing: 91,
      penguji: 88,
      pembimbingInstansi: 92,
    },
    {
      id: 14,
      mahasiswa: "Dina Rahmah",
      judul: "IoT Smart Agriculture",
      pembimbing: 84,
      penguji: 80,
      pembimbingInstansi: 86,
    },
    {
      id: 15,
      mahasiswa: "Arief Hidayat",
      judul: "AI dalam Diagnosis Medis",
      pembimbing: 93,
      penguji: 89,
      pembimbingInstansi: 95,
    },
  ]);

  const [jadwalSearchTerm, setJadwalSearchTerm] = useState("");
  const [nilaiSearchTerm, setNilaiSearchTerm] = useState("");
  const [jadwalCurrentPage, setJadwalCurrentPage] = useState(1);
  const [nilaiCurrentPage, setNilaiCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const hitungNilaiAkhir = (nilai) => {
    const bobotPembimbing = 0.4;
    const bobotPenguji = 0.3;
    const bobotPembimbingInstansi = 0.3;

    const nilaiAkhir = (
      nilai.pembimbing * bobotPembimbing +
      nilai.penguji * bobotPenguji +
      nilai.pembimbingInstansi * bobotPembimbingInstansi
    ).toFixed(2);

    return parseFloat(nilaiAkhir);
  };

  const filteredJadwal = useMemo(() => {
    return jadwalList.filter(
      (item) =>
        jadwalSearchTerm === "" ||
        item.mahasiswa.toLowerCase().includes(jadwalSearchTerm.toLowerCase())
    );
  }, [jadwalList, jadwalSearchTerm]);

  const filteredNilai = useMemo(() => {
    return nilaiList.filter(
      (item) =>
        nilaiSearchTerm === "" ||
        item.mahasiswa.toLowerCase().includes(nilaiSearchTerm.toLowerCase())
    );
  }, [nilaiList, nilaiSearchTerm]);

  const jadwalTotalPages = Math.ceil(filteredJadwal.length / itemsPerPage);
  const nilaiTotalPages = Math.ceil(filteredNilai.length / itemsPerPage);

  const paginatedJadwal = filteredJadwal.slice(
    (jadwalCurrentPage - 1) * itemsPerPage,
    jadwalCurrentPage * itemsPerPage
  );

  const paginatedNilai = filteredNilai.slice(
    (nilaiCurrentPage - 1) * itemsPerPage,
    nilaiCurrentPage * itemsPerPage
  );

  const handleJadwalSave = (formData) => {
    if (editingItem) {
      setJadwalList(
        jadwalList.map((item) =>
          item.id === editingItem.id ? { ...item, ...formData } : item
        )
      );
    } else {
      const newJadwal = {
        id: jadwalList.length + 1,
        ...formData,
      };
      setJadwalList([...jadwalList, newJadwal]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const renderEmptyState = (message) => (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );

  const renderJadwalTab = () => (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Cari jadwal (nama mahasiswa)"
            value={jadwalSearchTerm}
            onChange={(e) => setJadwalSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg"
          />
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <span className="mr-2">+</span>
          Tambah Jadwal
        </button>
      </div>

      {jadwalList.length === 0 ? (
        renderEmptyState("Belum ada jadwal ditambahkan")
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg border-collapse">
              <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase">
                    Waktu
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase">
                    Mahasiswa
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase">
                    Judul
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase">
                    Penguji
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase">
                    Ruangan
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedJadwal.map((jadwal) => (
                  <tr
                    key={jadwal.id}
                    className="hover:bg-blue-50 transition-all"
                  >
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-gray-700">
                      {new Date(jadwal.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-gray-700">
                      {jadwal.waktu}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-gray-700">
                      {jadwal.mahasiswa}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                      {jadwal.judul}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                      {jadwal.dosenPenguji}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-gray-700">
                      {jadwal.ruangan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingItem(jadwal);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 transition-all"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Apakah Anda yakin ingin menghapus jadwal ini?"
                              )
                            ) {
                              setJadwalList(
                                jadwalList.filter(
                                  (item) => item.id !== jadwal.id
                                )
                              );
                            }
                          }}
                          className="text-red-600 hover:text-red-800 transition-all"
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

          {filteredJadwal.length > itemsPerPage && (
            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setJadwalCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={jadwalCurrentPage === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                {[...Array(jadwalTotalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setJadwalCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded-md ${
                      jadwalCurrentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setJadwalCurrentPage((prev) =>
                      Math.min(prev + 1, jadwalTotalPages)
                    )
                  }
                  disabled={jadwalCurrentPage === jadwalTotalPages}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderNilaiTab = () => (
    <div>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari penilaian (nama mahasiswa)"
            value={nilaiSearchTerm}
            onChange={(e) => setNilaiSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg"
          />
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {nilaiList.length === 0 ? (
        renderEmptyState("Belum ada nilai ditambahkan")
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Detail Penilaian</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedNilai.map((jadwal) => (
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
                        <p className="font-semibold">{jadwal.pembimbing}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Penguji</p>
                        <p className="font-semibold">{jadwal.penguji}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Pembimbing Instansi</p>
                        <p className="font-semibold">
                          {jadwal.pembimbingInstansi}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 text-center bg-blue-50 px-4 py-2 rounded">
                    <p className="text-xs text-gray-600">Nilai Akhir</p>
                    <p className="text-xl font-bold text-blue-600">
                      {hitungNilaiAkhir(jadwal)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNilai.length > itemsPerPage && (
            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setNilaiCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={nilaiCurrentPage === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                {[...Array(nilaiTotalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setNilaiCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded-md ${
                      nilaiCurrentPage === i + 1 ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setNilaiCurrentPage((prev) =>
                      Math.min(prev + 1, nilaiTotalPages)
                    )
                  }
                  disabled={nilaiCurrentPage === nilaiTotalPages}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Jadwal & Nilai Seminar</h1>
      </div>

      <div className="mb-4 border-b">
        <nav className="flex space-x-4">
          <button
            onClick={() => {
              setActiveTab("jadwal");
              setCurrentPage(1);
            }}
            className={`py-2 px-4 ${
              activeTab === "jadwal"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Jadwal
          </button>
          <button
            onClick={() => {
              setActiveTab("nilai");
              setCurrentPage(1);
            }}
            className={`py-2 px-4 ${
              activeTab === "nilai"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Nilai
          </button>
        </nav>
      </div>

      {activeTab === "jadwal" ? renderJadwalTab() : renderNilaiTab()}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => {
                setIsModalOpen(false);
                setEditingItem(null);
              }}
            ></div>

            <TambahJadwal
              onSubmit={handleJadwalSave}
              initialData={editingItem}
              onClose={() => {
                setIsModalOpen(false);
                setEditingItem(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JadwalNilaiTabs;
