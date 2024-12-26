import { useState, useMemo } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import TambahJadwal from "../../modal/TambahJadwal";
import SearchBar from "../../SearchBar";
import { Button, Table } from "flowbite-react";
import Pagination from "../../Pagination";

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

  const handleSearchJadwal = (newQuery: string) => {
    setJadwalSearchTerm(newQuery);
    setJadwalCurrentPage(1);
  };

  const handleSearchNilai = (newQuery: string) => {
    setNilaiSearchTerm(newQuery);
    setNilaiCurrentPage(1);
  };

  const renderEmptyState = (message) => (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );

  const renderJadwalMobileCard = (jadwal) => (
    <div
      key={jadwal.id}
      className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200"
    >
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-base">{jadwal.mahasiswa}</h3>
            <p className="text-xs text-gray-600">{jadwal.judul}</p>
          </div>
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
                    jadwalList.filter((item) => item.id !== jadwal.id)
                  );
                }
              }}
              className="text-red-600 hover:text-red-800 transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-gray-600">Tanggal</p>
            <p className="font-medium">
              {new Date(jadwal.tanggal).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Waktu</p>
            <p className="font-medium">{jadwal.waktu}</p>
          </div>
          <div>
            <p className="text-gray-600">Penguji</p>
            <p className="font-medium">{jadwal.dosenPenguji}</p>
          </div>
          <div>
            <p className="text-gray-600">Ruangan</p>
            <p className="font-medium">{jadwal.ruangan}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderJadwalTab = () => (
    <div className="min-h-full">
      <div className="mb-4 flex flex-col sm:flex-row md:justify-between gap-3">
        <SearchBar
          value={jadwalSearchTerm}
          onChange={handleSearchJadwal}
          placeholder="Cari jadwal berdasarkan nama mahasiswa..."
        />

        <Button
          size="sm"
          color="blue"
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="whitespace-nowrap w-full sm:w-auto"
        >
          <Plus className="mr-2 h-5 w-5" />
          Tambah Jadwal
        </Button>
      </div>

      {jadwalList.length === 0 ? (
        renderEmptyState("Belum ada jadwal ditambahkan")
      ) : (
        <>
          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Tanggal</Table.HeadCell>
                <Table.HeadCell>Waktu</Table.HeadCell>
                <Table.HeadCell>Mahasiswa</Table.HeadCell>
                <Table.HeadCell>Judul</Table.HeadCell>
                <Table.HeadCell>Penguji</Table.HeadCell>
                <Table.HeadCell>Ruangan</Table.HeadCell>
                <Table.HeadCell>Aksi</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {paginatedJadwal.map((jadwal) => (
                  <Table.Row key={jadwal.id}>
                    <Table.Cell>
                      {new Date(jadwal.tanggal).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{jadwal.waktu}</Table.Cell>
                    <Table.Cell>{jadwal.mahasiswa}</Table.Cell>
                    <Table.Cell>{jadwal.judul}</Table.Cell>
                    <Table.Cell>{jadwal.dosenPenguji}</Table.Cell>
                    <Table.Cell>{jadwal.ruangan}</Table.Cell>
                    <Table.Cell>
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
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            {paginatedJadwal.map(renderJadwalMobileCard)}
          </div>

          {filteredJadwal.length > itemsPerPage && (
            <Pagination
              currentPage={jadwalCurrentPage}
              totalPages={jadwalTotalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredJadwal.length}
              onPageChange={setJadwalCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );

  const renderNilaiTab = () => (
    <div className="min-h-full">
      {nilaiList.length === 0 ? (
        renderEmptyState("Belum ada nilai ditambahkan")
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Detail Penilaian</h2>
          <div className="mb-4">
            <SearchBar
              value={nilaiSearchTerm}
              onChange={handleSearchNilai}
              placeholder="Cari penilaian berdasarkan nama mahasiswa..."
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {paginatedNilai.map((jadwal) => (
              <div
                key={jadwal.id}
                className="bg-white rounded-lg shadow-sm p-4 hover:shadow transition-shadow border border-gray-200"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-grow">
                    <div className="text-base font-semibold mb-1">
                      {jadwal.mahasiswa}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{jadwal.judul}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
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
                  <div className="w-full sm:w-auto text-center bg-blue-50 px-4 py-2 rounded">
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
            <Pagination
              currentPage={nilaiCurrentPage}
              totalPages={nilaiTotalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredNilai.length}
              onPageChange={setNilaiCurrentPage}
            />
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="md:p-4 sm:p-6 md:bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">
          Jadwal & Nilai Seminar
        </h1>
      </div>

      <div className="mb-4 border-b bg-gray-50">
        <nav className="flex space-x-4">
          <button
            onClick={() => {
              setActiveTab("jadwal");
              setJadwalCurrentPage(1);
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
              setNilaiCurrentPage(1);
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
