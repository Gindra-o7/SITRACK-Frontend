import {useState, useMemo, useEffect} from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import TambahJadwal from "../../modal/TambahJadwal";
import axiosInstance from "../../../configs/axios.configs.ts"

interface Jadwal {
  id: string;
  tanggal: string;
  waktuMulai: string;
  waktuSelesai: string;
  ruangan: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  mahasiswa: {
    nim: string;
    user: {
      nama: string;
    };
    mahasiswaKp: {
      judulLaporan: string;
    } | null;
  };
  dosen: {
    user: {
      nama: string;
    };
  };
}

interface Nilai {
  id: string;
  mahasiswa: string;
  nim: string;
  judul: string;
  pembimbing: number;
  penguji: number;
  pembimbingInstansi: number;
  nilaiAkhir: number;
  isFinalized: boolean;
}

const JadwalNilaiTabs = () => {
  const [activeTab, setActiveTab] = useState("jadwal");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [jadwalList, setJadwalList] = useState<Jadwal[]>([]);
  const [nilaiList, setNilaiList] = useState<Nilai[]>([]);
  const [jadwalSearchTerm, setJadwalSearchTerm] = useState("");
  const [nilaiSearchTerm, setNilaiSearchTerm] = useState("");
  const [jadwalCurrentPage, setJadwalCurrentPage] = useState(1);
  const [nilaiCurrentPage, setNilaiCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;

  const fetchJadwalData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/koordinator/jadwal`);
      setJadwalList(response.data);
    } catch (error) {
      console.error("Error fetching jadwal:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJadwalData();
  }, []);

  const handleJadwalSave = async (formData: any) => {
    try {
      if (editingItem) {
        // Handle edit case if needed
        await axiosInstance.put(`/koordinator/jadwal/${editingItem.id}`, formData);
      } else {
        await axiosInstance.post(`/koordinator/jadwal`, formData);
      }
      fetchJadwalData(); // Refresh the list
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Error saving jadwal:", error);
    }
  };

  const handleDeleteJadwal = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) {
      try {
        await axiosInstance.delete(`/koordinator/jadwal/${id}`);
        fetchJadwalData(); // Refresh the list
      } catch (error) {
        console.error("Error deleting jadwal:", error);
      }
    }
  };

  const fetchNilaiData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/koordinator/nilai');
      setNilaiList(response.data);
    } catch (error) {
      console.error("Error fetching nilai:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'nilai') {
      fetchNilaiData();
    }
  }, [activeTab]);

  const hitungNilaiAkhir = (nilai: Nilai) => {
    const bobotPembimbing = 0.4;
    const bobotPenguji = 0.2;
    const bobotPembimbingInstansi = 0.4;

    return nilai.nilaiAkhir || (
        nilai.pembimbing * bobotPembimbing +
        nilai.penguji * bobotPenguji +
        nilai.pembimbingInstansi * bobotPembimbingInstansi
    ).toFixed(2);
  };

  const filteredJadwal = useMemo(() => {
    return jadwalList.filter(
        (item) =>
            jadwalSearchTerm === "" ||
            item.mahasiswa.user.nama.toLowerCase().includes(jadwalSearchTerm.toLowerCase())
    );
  }, [jadwalList, jadwalSearchTerm]);

  const filteredNilai = useMemo(() => {
    return nilaiList.filter(
        (item) =>
            nilaiSearchTerm === "" ||
            item.mahasiswa.toLowerCase().includes(nilaiSearchTerm.toLowerCase())
    );
  }, [nilaiList, nilaiSearchTerm]);

  const getLetterGrade = (score: number): string => {
    if (score >= 85) return 'A';
    if (score >= 80) return 'A-';
    if (score >= 75) return 'B+';
    if (score >= 70) return 'B';
    if (score >= 65) return 'B-';
    if (score >= 60) return 'C+';
    if (score >= 55) return 'C';
    if (score >= 50) return 'D';
    return 'E';
  };

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
                  <tr key={jadwal.id} className="hover:bg-blue-50 transition-all">
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-gray-700">
                      {new Date(jadwal.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-gray-700">
                      {new Date(jadwal.waktuMulai).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-gray-700">
                      {jadwal.mahasiswa.user.nama}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-gray-700">
                      {jadwal.mahasiswa.mahasiswaKp?.judulLaporan || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-gray-700">
                      {jadwal.dosen.user.nama}
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
                          <Pencil className="w-5 h-5"/>
                        </button>
                        <button
                            onClick={() => handleDeleteJadwal(jadwal.id)}
                            className="text-red-600 hover:text-red-800 transition-all"
                        >
                          <Trash2 className="w-5 h-5"/>
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
                    <div className="ml-4 text-center">
                      <div className="flex bg-blue-50 px-4 py-2 rounded mb-2">
                        <p className="text-xl font-bold text-blue-600">
                          {hitungNilaiAkhir(jadwal)}
                        </p>
                        <p className="text-xl font-bold text-green-600 ml-1">
                          {getLetterGrade(parseFloat(hitungNilaiAkhir(jadwal)))}
                        </p>
                      </div>
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
