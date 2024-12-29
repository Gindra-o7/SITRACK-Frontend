import React, {useEffect, useState} from "react";
import { Search, ListFilter } from "lucide-react";
import InputNilaiDosenPembimbing from "../../modal/InputNilaiDosenPembimbing.tsx";
import LihatNilai from "../../modal/LihatNilai";
import axiosInstance from "../../../configs/axios.configs.ts";

interface Student {
  name: string;
  nim: string;
  department: string;
  status: "Menunggu Seminar" | "Selesai Seminar" | "Sedang Berlangsung";
  company: string;
  pembimbing: string;
  judulKP: string;
  action: "Input Nilai" | "Lihat Nilai";
}

interface UserData {
  nama: string;
  email: string;
  userRoles: {
    role: {
      name: string;
    };
  }[];
  dosen: {
    id: string | number;
  };
}

const MahasiswaSeminar: React.FC = () => {
  const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axiosInstance.get('/dosenpembimbing/me');
        setUser(userResponse.data);

        // Fetch students data
        const dosenId = userResponse.data.dosen.id;
        const studentsResponse = await axiosInstance.get(`/dosenpembimbing/${dosenId}/mahasiswa`);
        setStudents(studentsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmitNilai = async (nilai: number, mahasiswaNim: string) => {
    try {
      const dosenId = user?.dosen.id;
      if (!dosenId) throw new Error('Dosen ID not found');

      await axiosInstance.post(`/dosenpembimbing/${dosenId}/nilai`, {
        mahasiswaNim,
        nilai
      });

      // Refresh students data
      const response = await axiosInstance.get(`/dosenpembimbing/${dosenId}/mahasiswa`);
      setStudents(response.data);

      handleCloseInputModal();
    } catch (error) {
      console.error('Error submitting nilai:', error);
    }
  };

  const handleOpenInputModal = (student: Student): void => {
    setSelectedStudent(student);
    setIsInputModalOpen(true);
  };

  const handleCloseInputModal = (): void => {
    setIsInputModalOpen(false);
    setSelectedStudent(null);
  };

  const handleOpenViewModal = (student: Student): void => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = (): void => {
    setIsViewModalOpen(false);
    setSelectedStudent(null);
  };

  const handleStatsCardClick = (filter: string | null) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  // Get counts for each status
  const statusCounts = {
    total: students.length,
    menunggu: students.filter((s) => s.status === "Menunggu Seminar").length,
    berlangsung: students.filter((s) => s.status === "Sedang Berlangsung").length,
    selesai: students.filter((s) => s.status === "Selesai Seminar").length,
  };

  const filteredStudents = students
      .filter((student) => {
        if (!activeFilter) return true;
        switch (activeFilter) {
          case "total":
            return true;
          case "menunggu":
            return student.status === "Menunggu Seminar";
          case "berlangsung":
            return student.status === "Sedang Berlangsung";
          case "selesai":
            return student.status === "Selesai Seminar";
          default:
            return true;
        }
      })
      .filter(
          (student) =>
              student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              student.nim.includes(searchQuery) ||
              student.judulKP.toLowerCase().includes(searchQuery.toLowerCase())
      );

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-lg">Loading...</p>
        </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-10 px-8 pb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Selamat Datang, {user?.nama || 'Loading...'}</h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div
            className={`bg-white shadow-sm rounded-lg p-4 border-l-4 border-blue-500 cursor-pointer transition-all ${
              activeFilter === "total" ? "ring-2 ring-blue-500 shadow-md" : ""
            }`}
            onClick={() => handleStatsCardClick("total")}
          >
            <p className="text-gray-600 text-sm">Total Seminar</p>
            <h2 className="text-2xl font-bold mt-1">{statusCounts.total}</h2>
            <p className="text-blue-500 text-sm mt-2">Minggu Ini</p>
          </div>
          <div
            className={`bg-white shadow-sm rounded-lg p-4 border-l-4 border-yellow-500 cursor-pointer transition-all ${
              activeFilter === "menunggu"
                ? "ring-2 ring-yellow-500 shadow-md"
                : ""
            }`}
            onClick={() => handleStatsCardClick("menunggu")}
          >
            <p className="text-gray-600 text-sm">Menunggu Seminar</p>
            <h2 className="text-2xl font-bold mt-1">{statusCounts.menunggu}</h2>
            <p className="text-yellow-500 text-sm mt-2">Terjadwal</p>
          </div>
          <div
            className={`bg-white shadow-sm rounded-lg p-4 border-l-4 border-green-500 cursor-pointer transition-all ${
              activeFilter === "berlangsung"
                ? "ring-2 ring-green-500 shadow-md"
                : ""
            }`}
            onClick={() => handleStatsCardClick("berlangsung")}
          >
            <p className="text-gray-600 text-sm">Sedang Berlangsung</p>
            <h2 className="text-2xl font-bold mt-1">
              {statusCounts.berlangsung}
            </h2>
            <p className="text-green-500 text-sm mt-2">Hari Ini</p>
          </div>
          <div
            className={`bg-white shadow-sm rounded-lg p-4 border-l-4 border-purple-500 cursor-pointer transition-all ${
              activeFilter === "selesai"
                ? "ring-2 ring-purple-500 shadow-md"
                : ""
            }`}
            onClick={() => handleStatsCardClick("selesai")}
          >
            <p className="text-gray-600 text-sm">Selesai Seminar</p>
            <h2 className="text-2xl font-bold mt-1">{statusCounts.selesai}</h2>
            <p className="text-purple-500 text-sm mt-2">Sudah Dinilai</p>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Search and Filter */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari mahasiswa seminar..."
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className={`w-full sm:w-auto px-6 py-2 rounded-lg border border-gray-300 transition-colors flex items-center justify-center gap-2 ${
                  activeFilter
                    ? "bg-blue-50 border-blue-200 text-blue-600"
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => setActiveFilter(null)}
              >
                <ListFilter className="h-4 w-4" />
                {activeFilter ? "Clear Filter" : "Filter Status"}
              </button>
            </div>
          </div>

          {/* Student Cards */}
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredStudents.map((student, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {student.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        NIM: {student.nim}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        student.status === "Sedang Berlangsung"
                          ? "bg-green-100 text-green-600"
                          : student.status === "Menunggu Seminar"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {student.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <p className="text-gray-800 text-sm font-medium line-clamp-2">
                      {student.judulKP}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                    <p className="text-gray-600 text-sm flex justify-between">
                      <span>Pembimbing:</span>
                      <span className="font-medium">{student.pembimbing}</span>
                    </p>
                    <p className="text-gray-600 text-sm flex justify-between">
                      <span>Tempat KP:</span>
                      <span className="font-medium">{student.company}</span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => {
                        if (student.action === "Input Nilai") {
                          handleOpenInputModal(student);
                        } else if (student.action === "Lihat Nilai") {
                          handleOpenViewModal(student);
                        }
                      }}
                      className={`w-full py-2 rounded-lg font-medium transition-colors ${
                        student.status === "Selesai Seminar"
                          ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          : student.status === "Sedang Berlangsung"
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {student.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <InputNilaiDosenPembimbing
          isOpen={isInputModalOpen}
          onClose={handleCloseInputModal}
          student={selectedStudent}
          onSubmit={handleSubmitNilai}
      />
      <LihatNilai
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
          student={selectedStudent}
      />
    </div>
  );
};

export default MahasiswaSeminar;
