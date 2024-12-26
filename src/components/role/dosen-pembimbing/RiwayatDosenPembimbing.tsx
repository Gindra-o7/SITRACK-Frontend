import React, { useState } from "react";
import { Calendar, Building, FileText } from "lucide-react";
import SearchBar from "../../SearchBar";
import Pagination from "../../Pagination";
import { Dropdown } from "flowbite-react";

type Student = {
  nim: string;
  name: string;
  company: string;
  startDate: string;
  endDate: string;
  projectTitle: string;
  finalGrade: string;
  status: string;
};

type Period = {
  period: string;
  students: Student[];
};

const Riwayat: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [riwayatSearchTerm, setRiwayatSearchTerm] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [selectedSemester, setSelectedSemester] = useState<string>("Genap");

  const riwayatData: Period[] = [
    {
      period: "Genap 2023/2024",
      students: [
        {
          nim: "1910512001",
          name: "Rahmat Hidayat",
          company: "PT. Digital Solusi Indonesia",
          startDate: "1 Februari 2024",
          endDate: "30 April 2024",
          projectTitle: "Pengembangan Sistem ERP",
          finalGrade: "A",
          status: "Lulus",
        },
        {
          nim: "1910512002",
          name: "Sarah Putri",
          company: "PT. Tech Innovation",
          startDate: "1 Februari 2024",
          endDate: "30 April 2024",
          projectTitle: "Implementasi Sistem IoT",
          finalGrade: "A-",
          status: "Lulus",
        },
      ],
    },
    {
      period: "Ganjil 2023/2024",
      students: [
        {
          nim: "1910511001",
          name: "Ahmad Riza",
          company: "PT. Global Technology",
          startDate: "1 September 2023",
          endDate: "30 November 2023",
          projectTitle: "Pengembangan Mobile App",
          finalGrade: "B+",
          status: "Lulus",
        },
      ],
    },
  ];

  const filteredData = riwayatData.filter((period) =>
    period.students.some(
      (student) =>
        student.name.toLowerCase().includes(riwayatSearchTerm.toLowerCase()) ||
        student.nim.includes(riwayatSearchTerm) ||
        student.company.toLowerCase().includes(riwayatSearchTerm.toLowerCase())
    )
  );

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filteredData.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="md:py-8 md:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Riwayat Bimbingan
          </h1>
          <p className="text-gray-600 mt-2">
            Daftar riwayat bimbingan mahasiswa kerja praktik
          </p>
        </div>

        {/* Filter and Search Section */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-2">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <SearchBar
                  value={riwayatSearchTerm}
                  onChange={setRiwayatSearchTerm}
                  placeholder="Cari mahasiswa berdasarkan nama, NIM, atau perusahaan..."
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Dropdown
                label={selectedYear || "Pilih Tahun"}
                dismissOnClick={true}
                color="light"
              >
                <Dropdown.Item onClick={() => setSelectedYear("2024")}>
                  2024
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedYear("2023")}>
                  2023
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedYear("2022")}>
                  2022
                </Dropdown.Item>
              </Dropdown>

              <Dropdown
                label={selectedSemester || "Pilih Semester"}
                dismissOnClick={true}
                color="light"
              >
                <Dropdown.Item onClick={() => setSelectedSemester("Genap")}>
                  Semester Genap
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedSemester("Ganjil")}>
                  Semester Ganjil
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* History Cards */}
        {paginated.map((period, periodIndex) => (
          <div key={periodIndex} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {period.period}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {period.students.map((student, studentIndex) => (
                <div
                  key={studentIndex}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {student.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        NIM: {student.nim}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        student.status === "Lulus"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {student.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building className="h-4 w-4" />
                      <span>{student.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {student.startDate} - {student.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="h-4 w-4" />
                      <span>{student.projectTitle}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-600">Nilai Akhir</p>
                      <p className="text-2xl font-semibold text-blue-600">
                        {student.finalGrade}
                      </p>
                    </div>
                    <button className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
        />

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600">Tidak ada data yang ditemukan</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Riwayat;
