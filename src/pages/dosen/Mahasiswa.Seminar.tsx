import React, { useState } from "react";
import { Search, ListFilter } from "lucide-react";
import StudentCard, { Student } from "../../components/Card.Student";
import InputNilaiDosenPembimbing from "../../components/Modal/InputNilai.DosenPembimbing";
import LihatNilai from "../../components/Modal/LihatNilai";

const MahasiswaSeminar: React.FC = () => {
  const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const students: Student[] = [
    {
      name: "Ahmad Fauzi",
      nim: "1234567893",
      department: "Teknik Informatika",
      status: "Menunggu Seminar",
      company: "PT. Global Tech",
      pembimbing: "Dr. Budi Santoso, M.Kom",
      judulKP:
        "Pengembangan Sistem Informasi Berbasis Web Menggunakan React dan Node.js",
      action: "Input Nilai",
    },
    {
      name: "Linda Kusuma",
      nim: "1234567894",
      department: "Teknik Informatika",
      status: "Selesai Seminar",
      company: "PT. Solusi Digital",
      pembimbing: "Dr. Andi Wijaya, M.T",
      judulKP: "Implementasi Machine Learning untuk Prediksi Penjualan",
      action: "Lihat Nilai",
    },
    {
      name: "Michael Wijaya",
      nim: "1234567895",
      department: "Teknik Informatika",
      status: "Menunggu Seminar",
      company: "PT. Tech Inovasi",
      pembimbing: "Dr. Siti Rahayu, M.Kom",
      judulKP: "Pengembangan Aplikasi Mobile untuk Manajemen Inventory",
      action: "Input Nilai",
    },
  ];

  const handleOpenInputModal = (student: Student) => {
    setSelectedStudent(student);
    setIsInputModalOpen(true);
  };

  const handleCloseInputModal = () => {
    setIsInputModalOpen(false);
    setSelectedStudent(null);
  };

  const handleOpenViewModal = (student: Student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedStudent(null);
  };

  const handleStudentAction = (student: Student) => {
    if (student.action === "Input Nilai") {
      handleOpenInputModal(student);
    } else if (student.action === "Lihat Nilai") {
      handleOpenViewModal(student);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-10 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center md:text-left">
            Mahasiswa Seminar
          </h1>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Search and Filter */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full sm:flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari mahasiswa seminar..."
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="w-full sm:w-auto bg-white px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <ListFilter className="h-4 w-4" />
                Filter Status
              </button>
            </div>
          </div>

          {/* Student Cards */}
          <div className="p-4 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {students.map((student, index) => (
                <StudentCard
                  key={index}
                  student={student}
                  onActionClick={() => handleStudentAction(student)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <InputNilaiDosenPembimbing
        isOpen={isInputModalOpen}
        onClose={handleCloseInputModal}
        student={selectedStudent}
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
