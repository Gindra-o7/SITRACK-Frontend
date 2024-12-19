import React, { useState } from "react";
import {
  Search,
  ListFilter,
  Calendar,
  Building,
  User,
} from "lucide-react";
import { InputNilaiPembimbingInstansi } from "../../modal/InputNilai";
import LihatNilai from "../../modal/LihatNilai";
import Alert, { AlertData } from "../../Alert";

interface Student {
  nim: string;
  name: string;
  department: string;
  status: string;
  startDate: string;
  endDate: string;
  division: string;
  projectTitle: string;
  action: string;
}

const DashboardPembimbingInstansi: React.FC = () => {
  const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const students: Student[] = [
    {
      nim: "1910518001",
      name: "Budi Santoso",
      department: "Teknik Informatika",
      status: "Aktif",
      startDate: "1 Januari 2024",
      endDate: "31 Maret 2024",
      division: "Software Development",
      projectTitle: "Pengembangan Sistem Manajemen Inventaris",
      action: "Input Nilai",
    },
    {
      nim: "1910518002",
      name: "Ani Wijaya",
      department: "Teknik Informatika",
      status: "Aktif",
      startDate: "1 Februari 2024",
      endDate: "30 April 2024",
      division: "UI/UX Design",
      projectTitle: "Redesign Aplikasi Mobile Banking",
      action: "Input Nilai",
    },
    {
      nim: "1910518003",
      name: "Deni Pratama",
      department: "Teknik Informatika",
      status: "Selesai",
      startDate: "1 Desember 2023",
      endDate: "28 Februari 2024",
      division: "Data Analytics",
      projectTitle: "Analisis Performa Sistem Legacy",
      action: "Sudah Dinilai",
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

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nim.includes(searchQuery) ||
      student.division.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const alert: AlertData = {
    description: "Anda memiliki 3 mahasiswa yang harus dinilai",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex flex-col justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-semibold mb-2">
            Selamat Datang, PT. Technology Indonesia
          </h1>
          <p className="text-gray-600">Pembimbing Instansi Kerja Praktik</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow-sm rounded-lg p-4 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total Mahasiswa</p>
          <h2 className="text-2xl font-bold mt-1">3</h2>
          <p className="text-blue-500 text-sm mt-2">Semester Ini</p>
        </div>
        <div className="bg-white shadow-sm rounded-lg p-4 border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm">Mahasiswa Aktif</p>
          <h2 className="text-2xl font-bold mt-1">2</h2>
          <p className="text-yellow-500 text-sm mt-2">Menunggu Penilaian</p>
        </div>
        <div className="bg-white shadow-sm rounded-lg p-4 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Mahasiswa Selesai</p>
          <h2 className="text-2xl font-bold mt-1">1</h2>
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
                placeholder="Cari mahasiswa berdasarkan nama, NIM, atau divisi..."
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
                      {student.startDate} - {student.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Building className="h-4 w-4" />
                    <span>{student.division}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <User className="h-4 w-4" />
                    <span>{student.department}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      if (student.action === "Input Nilai") {
                        handleOpenInputModal(student);
                      } else if (student.action === "Sudah Dinilai") {
                        handleOpenViewModal(student);
                      }
                    }}
                    className={`w-full py-2 rounded-lg font-medium transition-colors ${
                      student.action === "Sudah Dinilai"
                        ? "bg-blue-50 hover:bg-blue-100 text-blue-600"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
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

      {/* Modals */}
      <InputNilaiPembimbingInstansi
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

export default DashboardPembimbingInstansi;