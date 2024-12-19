import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import ValidationModal from "@/components/modal/Validasi.Modal";
import ValidationCard from "@/components/Card.Validation";

const Validasi = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "M Iqbal",
      nim: "12250111001",
      documentStatus: "Pendaftaran",
      submissionDate: "2024-03-15",
      status: "menunggu",
      documentsHistory: {} as Record<string, Document[]>,
    },
    {
      id: 2,
      name: "Siti Fatima",
      nim: "12250111002",
      documentStatus: "Persyaratan",
      submissionDate: "2024-02-28",
      status: "menunggu",
      documentsHistory: {} as Record<string, Document[]>,
    },
    {
      id: 3,
      name: "Muhammad Rizki",
      nim: "12250111003",
      documentStatus: "Pasca Seminar",
      submissionDate: "2024-01-10",
      status: "menunggu",
      documentsHistory: {} as Record<string, Document[]>,
    },
    {
      id: 4,
      name: "Dewi Anggraini",
      nim: "12250111004",
      documentStatus: "Pendaftaran",
      submissionDate: "2024-03-01",
      status: "menunggu",
      documentsHistory: {} as Record<string, Document[]>,
    },
    {
      id: 5,
      name: "Budi Santoso",
      nim: "12250111005",
      documentStatus: "Persyaratan",
      submissionDate: "2024-02-15",
      status: "menunggu",
      documentsHistory: {} as Record<string, Document[]>,
    },
    {
      id: 6,
      name: "Rina Wijayanti",
      nim: "12250111006",
      documentStatus: "Pasca Seminar",
      submissionDate: "2024-01-20",
      status: "menunggu",
      documentsHistory: {} as Record<string, Document[]>,
    },
    {
      id: 7,
      name: "Hendro Prasetyo",
      nim: "12250111007",
      documentStatus: "Pendaftaran",
      submissionDate: "2024-03-05",
      status: "menunggu",
      documentsHistory: {} as Record<string, Document[]>,
    },
    {
      id: 8,
      name: "Annisa Nurhaliza",
      nim: "12250111008",
      documentStatus: "Persyaratan",
      submissionDate: "2024-02-20",
      status: "menunggu",
      documentsHistory: {} as Record<string, Document[]>,
    },
    {
      id: 9,
      name: "Yusuf Ardiansyah",
      nim: "12250111009",
      documentStatus: "Pasca Seminar",
      submissionDate: "2024-03-10",
      status: "menunggu",
      documentsHistory: {} as Record<string, Document[]>,
    },
    {
      id: 10,
      name: "Ratna Sari",
      nim: "12250111010",
      documentStatus: "Persyaratan",
      submissionDate: "2024-03-12",
      status: "menunggu",
      documentsHistory: {} as Record<string, Document[]>,
    },
    {
      id: 11,
      name: "Adi Saputra",
      nim: "12250111011",
      documentStatus: "Pendaftaran",
      submissionDate: "2024-03-13",
      status: "menunggu",
      documentsHistory: {} as Record<string, Document[]>,
    },
    {
      id: 12,
      name: "Lestari Dewi",
      nim: "12250111012",
      documentStatus: "Pasca Seminar",
      submissionDate: "2024-01-11",
      status: "menunggu",
      documentsHistory: {} as Record<string, Document[]>,
    },
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fungsi untuk mengupdate status mahasiswa setelah validasi
  const updateStudentStatus = (studentId: number, documents: Document[]) => {
    setStudents((prevStudents) =>
        prevStudents.map((student) => {
          if (student.id === studentId) {
            const allApproved = documents.every((doc) => doc.status === "setuju");
            const hasRevisions = documents.some((doc) => doc.status === "revisi");

            // Store the documents state in the student's history
            const updatedHistory = {
              ...student.documentsHistory,
              [student.documentStatus]: documents,
            };

            return {
              ...student,
              status: allApproved
                  ? "setuju"
                  : hasRevisions
                      ? "revisi"
                      : "menunggu",
              documentsHistory: updatedHistory,
            };
          }
          return student;
        })
    );
  };

  // Filter Mahasiswa berdasarkan status dokumennya
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.nim.includes(searchTerm);
    const matchesFilter =
        filterStatus === "" || student.documentStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
      <div className="container px-4 py-6 md:px-6 bg-gray-50 min-h-screen">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
          Validasi Dokumen Mahasiswa
        </h1>

        {/* Search and Filter Container */}
        <div className="mb-4 md:mb-6">
          <div className="flex items-center space-x-2">
            {/* Search Input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                  type="text"
                  placeholder="Cari nama/NIM"
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Buttons */}
            <div className="hidden md:block">
              <div className="flex space-x-2">
                {["Persyaratan", "Pendaftaran", "Pasca Seminar"].map((status) => (
                    <button
                        key={status}
                        className={`
                    px-3 py-2 rounded-full text-xs font-medium transition-colors
                    ${
                            filterStatus === status
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }
                  `}
                        onClick={() =>
                            setFilterStatus(filterStatus === status ? "" : status)
                        }
                    >
                      {status}
                    </button>
                ))}
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="md:hidden">
              <button
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg"
              >
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile Filter Dropdown */}
          {mobileFiltersOpen && (
              <div className="md:hidden mt-2 flex flex-wrap gap-2">
                {["Pendaftaran", "Persyaratan", "Pasca Seminar"].map((status) => (
                    <button
                        key={status}
                        className={`
                  px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                  ${
                            filterStatus === status
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }
                `}
                        onClick={() =>
                            setFilterStatus(filterStatus === status ? "" : status)
                        }
                    >
                      {status}
                    </button>
                ))}
              </div>
          )}
        </div>

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filteredStudents.map((student) => (
              <div key={student.id} className="relative">
                <ValidationCard
                    student={{
                      name: student.name,
                      nim: student.nim,
                      documentStatus: student.documentStatus,
                      submissionDate: student.submissionDate,
                      status: student.status,
                    }}
                    variant="default"
                    className="h-full cursor-pointer"
                    onClick={() => {
                      setActiveDocument({
                        id: student.id,
                        title: `Dokumen ${student.documentStatus} - ${student.name}`,
                        status: student.status,
                        documentStatus: student.documentStatus,
                      });
                      setShowDialog(true);
                    }}
                />
              </div>
          ))}

          {/* Empty State */}
          {filteredStudents.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                Tidak ada pengajuan yang ditemukan
              </div>
          )}
        </div>

        {/* Validation Dialog */}
        {showDialog && activeDocument && (
            <ValidationModal
                activeDocument={{
                  ...activeDocument,
                  documentStatus:
                      activeDocument.documentStatus as keyof typeof documentLists,
                }}
                initialDocuments={
                    students.find((s) => s.id === activeDocument.id)?.documentsHistory[
                        activeDocument.documentStatus
                        ] || []
                }
                onClose={() => {
                  setShowDialog(false);
                  setActiveDocument(null);
                }}
                onSave={(documents) => {
                  updateStudentStatus(activeDocument.id, documents);
                  setShowDialog(false);
                  setActiveDocument(null);
                }}
            />
        )}
      </div>
  );
};

export default Validasi;