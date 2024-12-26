import React, { useState } from "react";
import { InputNilaiDosenPembimbing } from "../../modal/InputNilai";
import LihatNilai from "../../modal/LihatNilai";
import SearchBar from "../../SearchBar";
import { Button } from "flowbite-react";
import Pagination from "../../Pagination";

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

const MahasiswaSeminar: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const students: Student[] = [
    // Menunggu Seminar
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
      name: "Michael Wijaya",
      nim: "1234567895",
      department: "Teknik Informatika",
      status: "Menunggu Seminar",
      company: "PT. Tech Inovasi",
      pembimbing: "Dr. Siti Rahayu, M.Kom",
      judulKP: "Pengembangan Aplikasi Mobile untuk Manajemen Inventory",
      action: "Input Nilai",
    },
    {
      name: "Sarah Putri",
      nim: "1234567896",
      department: "Teknik Informatika",
      status: "Menunggu Seminar",
      company: "PT. Digital Solution",
      pembimbing: "Dr. Ahmad Rahman, M.T",
      judulKP: "Implementasi Internet of Things untuk Smart Home",
      action: "Input Nilai",
    },
    // Sedang Berlangsung
    {
      name: "Diana Permata",
      nim: "1234567897",
      department: "Teknik Informatika",
      status: "Sedang Berlangsung",
      company: "PT. Cyber Indonesia",
      pembimbing: "Dr. Hendro Wicaksono, M.Kom",
      judulKP: "Pengembangan Sistem Keamanan Berbasis AI",
      action: "Input Nilai",
    },
    {
      name: "Reza Pratama",
      nim: "1234567898",
      department: "Teknik Informatika",
      status: "Sedang Berlangsung",
      company: "PT. Data Analytics",
      pembimbing: "Dr. Maya Indah, M.T",
      judulKP: "Analisis Big Data untuk Prediksi Perilaku Konsumen",
      action: "Input Nilai",
    },
    {
      name: "Dewi Safitri",
      nim: "1234567899",
      department: "Teknik Informatika",
      status: "Sedang Berlangsung",
      company: "PT. Cloud Solutions",
      pembimbing: "Dr. Eko Prasetyo, M.Kom",
      judulKP: "Implementasi Cloud Computing untuk Sistem Enterprise",
      action: "Input Nilai",
    },
    // Selesai Seminar
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
      name: "Budi Hartono",
      nim: "1234567901",
      department: "Teknik Informatika",
      status: "Selesai Seminar",
      company: "PT. Software House",
      pembimbing: "Dr. Rini Susanti, M.Kom",
      judulKP: "Pengembangan E-Commerce dengan Progressive Web App",
      action: "Lihat Nilai",
    },
    {
      name: "Rina Melati",
      nim: "1234567902",
      department: "Teknik Informatika",
      status: "Selesai Seminar",
      company: "PT. Tech Solutions",
      pembimbing: "Dr. Bambang Kusumo, M.T",
      judulKP: "Implementasi Blockchain untuk Supply Chain Management",
      action: "Lihat Nilai",
    },
  ];

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
    berlangsung: students.filter((s) => s.status === "Sedang Berlangsung")
      .length,
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
        student.nim.includes(searchQuery)
    );

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filteredStudents.slice(startIndex, endIndex);

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    setCurrentPage(1);
  };

  return (
    <div className="">
      <main>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Mahasiswa Bimbingan</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
              <SearchBar
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Cari mahasiswa berdasarkan nama atau NIM..."
              />
            </div>
          </div>

          {/* Student Cards Grid */}
          <div className="pt-4 md:p-6">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {paginated.map((student, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Card Header */}
                  <div className="p-4 flex flex-col space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                          {student.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          NIM: {student.nim}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          student.status === "Sedang Berlangsung"
                            ? "bg-green-100 text-green-700"
                            : student.status === "Menunggu Seminar"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>

                    {/* Thesis Title */}
                    <div className="min-h-[3rem]">
                      <p className="text-sm text-gray-800 font-medium line-clamp-2">
                        {student.judulKP}
                      </p>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Pembimbing</span>
                      <span className="text-gray-900 font-medium line-clamp-1 text-right max-w-[60%]">
                        {student.pembimbing}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Tempat KP</span>
                      <span className="text-gray-900 font-medium line-clamp-1 text-right max-w-[60%]">
                        {student.company}
                      </span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-4 mt-auto">
                    <Button
                      onClick={() => {
                        if (student.action === "Input Nilai") {
                          handleOpenInputModal(student);
                        } else if (student.action === "Lihat Nilai") {
                          handleOpenViewModal(student);
                        }
                      }}
                      className={`w-full  rounded-lg font-medium text-sm transition-colors duration-200 ${
                        student.status === "Selesai Seminar"
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : student.status === "Sedang Berlangsung"
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-blue-700 text-white hover:bg-blue-800"
                      }`}
                    >
                      {student.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {filteredStudents.length > itemsPerPage && (
              <div className="my-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredStudents.length}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
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
