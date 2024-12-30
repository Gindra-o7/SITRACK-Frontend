import React, { useEffect, useState } from "react";
import { Search, ListFilter, Calendar, Building, User } from "lucide-react";
import InputNilaiPembimbingInstansi from "../../modal/InputNilaiPembimbingInstansi";
import LihatNilai from "../../modal/LihatNilai";
import Alert, { AlertData } from "../../Alert";
import axiosInstance from "../../../configs/axios.configs.ts";

interface Student {
  nim: string;
  name: string;
  startDate: string;
  endDate: string;
  projectTitle: string;
  status: string;
  seminarDate?: string;
  hasNilai?: boolean;
  nilai?: number;
}

interface UserData {
  nama: string;
  email: string;
  userRoles: {
    role: {
      name: string;
    };
  }[];
}

interface NilaiData {
  nilaiPembimbingInstansi: number;
  mahasiswa: {
    user: {
      nama: string;
    };
  };
  jadwalSeminar: {
    tanggal: string;
  };
}

const DashboardPembimbingInstansi: React.FC = () => {
  const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [user, setUser] = useState<UserData | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [studentStats, setStudentStats] = useState({
    total: 0,
    active: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch user profile
        const userResponse = await axiosInstance.get('/pembimbinginstansi/me');
        setUser(userResponse.data);

        // Fetch students
        const studentsResponse = await axiosInstance.get('/pembimbinginstansi/mahasiswa');
        const studentsWithNilai = await Promise.all(
            studentsResponse.data.map(async (student: Student) => {
              try {
                const nilaiResponse = await axiosInstance.get(`/pembimbinginstansi/mahasiswa/${student.nim}/nilai`);
                return {
                  ...student,
                  hasNilai: true,
                  nilai: nilaiResponse.data.nilaiPembimbingInstansi
                };
              } catch (error) {
                return {
                  ...student,
                  hasNilai: false
                };
              }
            })
        );
        setStudents(studentsWithNilai);

        // Calculate stats
        const stats = {
          total: studentsWithNilai.length,
          active: studentsWithNilai.filter((s: Student) => s.status === 'Aktif').length,
          completed: studentsWithNilai.filter((s: Student) => s.status === 'Selesai').length
        };
        setStudentStats(stats);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenInputModal = (student: Student) => {
    setSelectedStudent(student);
    setIsInputModalOpen(true);
  };

  const handleCloseInputModal = () => {
    setIsInputModalOpen(false);
    setSelectedStudent(undefined);  // Changed null to undefined
  };

  const handleOpenViewModal = async (student: Student) => {
    try {
      const response = await axiosInstance.get(`/pembimbinginstansi/mahasiswa/${student.nim}/nilai`);
      const nilaiData: NilaiData = response.data;
      setSelectedStudent({
        ...student,
        nilai: nilaiData.nilaiPembimbingInstansi
      });
      setIsViewModalOpen(true);
    } catch (error) {
      console.error('Error fetching nilai:', error);
    }
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedStudent(undefined);  // Changed null to undefined
  };

  const handleSubmitNilai = async (nim: string, nilai: number) => {
    try {
      await axiosInstance.post(`/pembimbinginstansi/mahasiswa/${nim}/nilai`, { nilai });
      // Refresh student data after submitting nilai
      const studentsResponse = await axiosInstance.get('/pembimbinginstansi/mahasiswa');
      setStudents(studentsResponse.data);
      handleCloseInputModal();
    } catch (error) {
      console.error('Error submitting nilai:', error);
    }
  };

  const filteredStudents = students.filter(
      (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.nim.includes(searchQuery)
  );

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-8">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 p-8 text-red-500">{error}</div>;
  }

  const alert: AlertData = {
    description: `Anda memiliki ${studentStats.active} mahasiswa yang harus dinilai`,
  };

  return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="flex flex-col justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-semibold mb-2">
              Selamat Datang, {user?.nama || 'Loading...'}
            </h2>
            <p className="text-gray-600">Pembimbing Instansi Kerja Praktik</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white shadow-sm rounded-lg p-4 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm">Total Mahasiswa</p>
            <h2 className="text-2xl font-bold mt-1">{studentStats.total}</h2>
            <p className="text-blue-500 text-sm mt-2">Semester Ini</p>
          </div>
          <div className="bg-white shadow-sm rounded-lg p-4 border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm">Mahasiswa Aktif</p>
            <h2 className="text-2xl font-bold mt-1">{studentStats.active}</h2>
            <p className="text-yellow-500 text-sm mt-2">Menunggu Penilaian</p>
          </div>
          <div className="bg-white shadow-sm rounded-lg p-4 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm">Mahasiswa Selesai</p>
            <h2 className="text-2xl font-bold mt-1">{studentStats.completed}</h2>
            <p className="text-green-500 text-sm mt-2">Sudah Dinilai</p>
          </div>
        </div>

        <Alert description={alert.description} />

        {/* Student List Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium mb-4">
              Daftar Mahasiswa Kerja Praktik
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Cari mahasiswa berdasarkan nama atau NIM..."
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="w-full sm:w-auto bg-white px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <ListFilter className="h-4 w-4" />
                Filter Status
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredStudents.map((student) => (
                  <div
                      key={student.nim}
                      className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {student.name}
                        </h3>
                        <p className="text-gray-600 text-sm">NIM: {student.nim}</p>
                      </div>
                      <span
                          className={`px-3 py-1 rounded-full text-xs ${
                              student.status === "Aktif"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-blue-100 text-blue-600"
                          }`}
                      >
                    {student.status}
                  </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-gray-800 text-sm font-medium">
                        {student.projectTitle}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>
                      {new Date(student.startDate).toLocaleDateString()} - {new Date(student.endDate).toLocaleDateString()}
                    </span>
                      </div>
                      {student.seminarDate && (
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>Seminar: {new Date(student.seminarDate).toLocaleDateString()}</span>
                          </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <button
                          onClick={() => {
                            if (student.hasNilai) {
                              handleOpenViewModal(student);
                            } else {
                              handleOpenInputModal(student);
                            }
                          }}
                          className={`w-full py-2 rounded-lg font-medium transition-colors ${
                              student.hasNilai
                                  ? "bg-blue-50 hover:bg-blue-100 text-blue-600"
                                  : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
                      >
                        {student.hasNilai ? "Lihat Nilai" : "Input Nilai"}
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modals */}
        <InputNilaiPembimbingInstansi
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

export default DashboardPembimbingInstansi;