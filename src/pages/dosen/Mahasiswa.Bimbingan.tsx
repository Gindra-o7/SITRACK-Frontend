import React, { useState, useRef, useMemo } from "react";
import { Search, ListFilter } from "lucide-react";
import InputNilaiDosenPembimbing from "../../components/Modal/InputNilai.DosenPembimbing";
import LihatNilai from "../../components/Modal/LihatNilai";
import StudentCard, { Student } from "../../components/Card.Student";

const MahasiswaSeminar: React.FC = () => {
  const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const studentsSectionRef = useRef<HTMLDivElement>(null);

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
    // Toggle the filter: if clicking the same filter again, reset the filter
    setActiveFilter((prevFilter) => (prevFilter === filter ? null : filter));

    // Scroll to students section
    studentsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStudentAction = (student: Student) => {
    if (student.action === "Input Nilai") {
      handleOpenInputModal(student);
    } else if (student.action === "Lihat Nilai") {
      handleOpenViewModal(student);
    }
  };

  // Memoized filtered students to improve performance
  const filteredStudents = useMemo(() => {
    return students
      .filter((student) => {
        // Filter by status if a filter is active
        if (activeFilter) {
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
        }
        return true;
      })
      .filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.nim.includes(searchQuery) ||
          student.judulKP.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [students, activeFilter, searchQuery]);

  // Compute status counts
  const statusCounts = useMemo(
    () => ({
      total: students.length,
      menunggu: students.filter((s) => s.status === "Menunggu Seminar").length,
      berlangsung: students.filter((s) => s.status === "Sedang Berlangsung")
        .length,
      selesai: students.filter((s) => s.status === "Selesai Seminar").length,
    }),
    [students]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-10 px-4 md:px-8 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-0">
            Mahasiswa Bimbingan
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 md:gap-6 mb-4 xs:mb-6 md:mb-8 px-2 xs:px-4 md:px-0">
          {[
            {
              key: "total",
              label: "Total Seminar",
              count: statusCounts.total,
              borderColor: "border-blue-500",
              textColor: "text-blue-500",
            },
            {
              key: "menunggu",
              label: "Menunggu Seminar",
              count: statusCounts.menunggu,
              borderColor: "border-yellow-500",
              textColor: "text-yellow-500",
            },
            {
              key: "berlangsung",
              label: "Sedang Berlangsung",
              count: statusCounts.berlangsung,
              borderColor: "border-green-500",
              textColor: "text-green-500",
            },
            {
              key: "selesai",
              label: "Selesai Seminar",
              count: statusCounts.selesai,
              borderColor: "border-purple-500",
              textColor: "text-purple-500",
            },
          ].map(({ key, label, count, borderColor, textColor }) => (
            <div
              key={key}
              className={`bg-white shadow-sm rounded-lg p-3 xs:p-4 ${borderColor} border-l-4 cursor-pointer transition-all hover:shadow-md ${
                activeFilter === key
                  ? `ring-2 ${borderColor.replace("border", "ring")} shadow-md`
                  : ""
              }`}
              onClick={() => handleStatsCardClick(key)}
            >
              <div className="flex flex-col h-full justify-between">
                <p className="text-gray-600 text-xs xs:text-sm">{label}</p>
                <h2 className="text-lg xs:text-xl md:text-2xl font-bold my-1">
                  {count}
                </h2>
                <p className={`${textColor} text-xs xs:text-sm mt-auto`}>
                  {key === "total"
                    ? "Minggu Ini"
                    : key === "menunggu"
                    ? "Terjadwal"
                    : key === "berlangsung"
                    ? "Hari Ini"
                    : "Sudah Dinilai"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Card */}
        <div ref={studentsSectionRef} className="bg-white rounded-lg shadow-sm">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
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
            </div>
          </div>
          {/* Student Cards */}
          <div className="p-4 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <StudentCard
                    key={index}
                    student={student}
                    onActionClick={() => handleStudentAction(student)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-8">
                  Tidak ada mahasiswa yang sesuai dengan filter
                </div>
              )}
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
