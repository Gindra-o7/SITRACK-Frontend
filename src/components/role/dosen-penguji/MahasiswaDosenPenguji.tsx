import React, { useState } from "react";
import { InputNilaiDosenPenguji } from "../../modal/InputNilai";
import LihatNilai from "../../modal/LihatNilai";
import SearchBar from "../../SearchBar";
import { Button } from "flowbite-react";
import Pagination from "../../Pagination";

type Student = {
  name: string;
  nim: string;
  department: string;
  status: string;
  company: string;
  pembimbing: string;
  judulKP: string;
  action: string;
};

const MahasiswaSeminar: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
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

  const itemsPerPage = 6;

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nim.includes(searchQuery)
  );

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filteredStudents.slice(startIndex, endIndex);

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

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    setCurrentPage(1);
  };

  return (
    <div>
      <main className="container ">
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Mahasiswa Seminar
          </h1>
        </div>

        <div className="bg-white rounded-xl md:shadow-sm">
          {/* Search Section */}
          <div className="pb-4 md:p-6 border-b border-gray-200">
            <SearchBar
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Cari mahasiswa berdasarkan nama atau NIM..."
            />
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

      <InputNilaiDosenPenguji
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
