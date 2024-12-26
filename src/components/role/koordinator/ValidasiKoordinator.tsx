import { useState } from "react";
import { Filter } from "lucide-react";
import ValidationModal from "../../modal/Validasi.Modal";
import { ValidationCard } from "../../Card.tsx";
import SearchBar from "../../SearchBar.tsx";
import { Button, Dropdown } from "flowbite-react";
import Pagination from "../../Pagination.tsx";

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
  const [currentPage, setCurrentPage] = useState(1);

  const [showDialog, setShowDialog] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const status = [
    { id: "all", label: "Semua" },
    { id: "persyaratan", label: "Persyaratan" },
    { id: "pendaftaran", label: "Pendaftaran" },
    { id: "pasca_seminar", label: "Pasca Seminar" },
  ];

  const itemsPerPage = 15;

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
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nim.includes(searchQuery);
    const matchesFilter =
      filterStatus === "all" ||
      student.documentStatus.toLowerCase() ===
        status.find((s) => s.id === filterStatus)?.label.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filteredStudents.slice(startIndex, endIndex);

  const handleFilterChange = (newFilter: string) => {
    setFilterStatus(newFilter);
    setCurrentPage(1);
  };

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    setCurrentPage(1);
  };

  return (
    <div className="container ">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
        Validasi Dokumen Mahasiswa
      </h1>

      {/* Search and Filter Container */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center space-x-2">
          {/* Search Input */}
          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Cari mahasiswa berdasarkan nama atau NIM..."
          />

          {/* Filter Buttons */}
          <div className="hidden md:block">
            <div className="flex space-x-2">
              {status.map((status) => (
                <Button
                  key={status.id}
                  color={filterStatus === status.id ? "blue" : "light"}
                  onClick={() => {
                    handleFilterChange(status.id);
                  }}
                  size="sm"
                  className="whitespace-nowrap py-1 border-gray-200"
                >
                  {status.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filter Dropdown */}
        <div className="md:hidden pt-2">
          <Dropdown
            label={
              <span className="flex items-center text-gray-600 text-xs">
                <Filter className="h-4 w-4 mr-2" />
                <span>{status.find((s) => s.id === filterStatus)?.label}</span>
              </span>
            }
            dismissOnClick={true}
            color="light"
          >
            {status.map((statusItem) => (
              <Dropdown.Item
                key={statusItem.id}
                onClick={() => {
                  handleFilterChange(statusItem.id);
                }}
                className={filterStatus === statusItem.id ? "bg-blue-50" : ""}
              >
                <span
                  className={
                    filterStatus === statusItem.id
                      ? "text-blue-600 font-medium"
                      : ""
                  }
                >
                  {statusItem.label}
                </span>
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-2">
        {paginated.map((student) => (
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

      {filteredStudents.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredStudents.length}
          onPageChange={setCurrentPage}
        />
      )}

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
