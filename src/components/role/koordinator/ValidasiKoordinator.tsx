import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import ValidationModal from "../../modal/Validasi.Modal";
import { ValidationCard } from "../../Card";
import axiosInstance from "../../../configs/axios.configs";
import { Spinner } from "flowbite-react"
import {LoadingValidationDocument} from "../../../pages/LoadingInterface"

interface User {
  id: string;
  email: string;
  nama: string;
  photoPath: string;
}

interface Document {
  id: string;
  jenisDokumen: string;
  kategori: string;
  status: string;
  tanggalUpload: string;
  filePath: string;
}

interface Student {
  id: string;
  nim: string;
  noHp: string;
  semester: number;
  user: User;
  dokumen: Document[];
}

interface APIResponse {
  success: boolean;
  message: string;
  data: Student[];
}

interface GroupedDocuments {
  PERSYARATAN: Document[];
  PENDAFTARAN: Document[];
  PASCA_SEMINAR: Document[];
}

interface ProcessedStudent {
  id: string;
  name: string;
  nim: string;
  documentStatus: string;
  submissionDate: string;
  status: string;
  photoPath: string;
  email: string;
  noHp: string;
  semester: number;
}

const Validasi = () => {
  const [students, setStudents] = useState<ProcessedStudent[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [activeDocument, setActiveDocument] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedStudentDocs, setSelectedStudentDocs] = useState<GroupedDocuments>({
    PERSYARATAN: [],
    PENDAFTARAN: [],
    PASCA_SEMINAR: []
  });

  const processStudentData = (apiData: Student[]): ProcessedStudent[] => {
    return apiData.map(student => {
      const latestDoc = student.dokumen.reduce((latest, current) => {
        return !latest || new Date(current.tanggalUpload) > new Date(latest.tanggalUpload)
            ? current
            : latest;
      }, null as Document | null);

      return {
        id: student.id,
        name: student.user.nama,
        nim: student.nim,
        documentStatus: latestDoc?.kategori || "PERSYARATAN",
        submissionDate: latestDoc?.tanggalUpload || new Date().toISOString(),
        status: latestDoc?.status || "Belum Mengirim",
        photoPath: student.user.photoPath,
        email: student.user.email,
        noHp: student.noHp,
        semester: student.semester
      };
    });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get<APIResponse>('/koordinator/mahasiswa-document');
            if (response.data.success) {
                setStudents(processStudentData(response.data.data));
            } else {
                console.error('Error fetching students:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

  const groupDocumentsByCategory = (documents: Document[]): GroupedDocuments => {
    return documents.reduce((acc, doc) => {
      const category = doc.kategori as keyof GroupedDocuments;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(doc);
      return acc;
    }, {
      PERSYARATAN: [],
      PENDAFTARAN: [],
      PASCA_SEMINAR: []
    } as GroupedDocuments);
  };

  const fetchStudentDocuments = async (nim: string) => {
    try {
      const response = await axiosInstance.get<APIResponse>(`/koordinator/mahasiswa-document`);
      if (response.data.success) {
        const student = response.data.data.find(s => s.nim === nim);
        if (student) {
          setSelectedStudentDocs(groupDocumentsByCategory(student.dokumen));
        }
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const updateDocumentStatus = async (docId: string, status: string, komentar?: string) => {
    try {
      await axiosInstance.patch(`/koordinator/document/${docId}/status`, {
        status,
        komentar
      });
      await fetchStudents();
      if (activeDocument) {
        const activeStudent = students.find(s => s.id === activeDocument.id);
        if (activeStudent) {
          await fetchStudentDocuments(activeStudent.nim);
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCardClick = async (student: ProcessedStudent) => {
    setActiveDocument({
      id: student.id,
      title: `Dokumen ${student.documentStatus} - ${student.name}`,
      status: student.status,
      documentStatus: student.documentStatus,
    });
    await fetchStudentDocuments(student.nim);
    setShowDialog(true);
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.nim.includes(searchTerm);
    const matchesFilter = filterStatus === "" || student.documentStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
      <div className="container px-4 py-6 md:px-6 bg-gray-50 min-h-screen">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-6">
              Validasi Dokumen Mahasiswa
          </h1>

          {/* Search and Filter Container */}
          <div className="mb-4 md:mb-6">
              <div className="flex items-center space-x-2">
                  <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-gray-400"/>
                      </div>
                      <input
                          type="text"
                          placeholder="Cari nama/NIM"
                          className="w-full pl-10 p-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                  </div>

                  <div className="hidden md:block">
                      <div className="flex space-x-2">
                          {["PERSYARATAN", "PENDAFTARAN", "PASCA_SEMINAR"].map((status) => (
                              <button
                                  key={status}
                                  className={`
                    px-3 py-2 rounded-full text-xs font-medium transition-colors
                    ${filterStatus === status
                                      ? "bg-blue-600 text-white"
                                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                  }
                  `}
                                  onClick={() => setFilterStatus(filterStatus === status ? "" : status)}
                              >
                                  {status.replace("_", " ")}
                              </button>
                          ))}
                      </div>
                  </div>

                  <button
                      className="md:hidden p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                      onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  >
                      <Filter className="h-4 w-4"/>
                  </button>
              </div>

              {mobileFiltersOpen && (
                  <div className="md:hidden mt-2 flex flex-wrap gap-2">
                      {["PERSYARATAN", "PENDAFTARAN", "PASCA_SEMINAR"].map((status) => (
                          <button
                              key={status}
                              className={`
                  px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                  ${filterStatus === status
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }
                `}
                              onClick={() => setFilterStatus(filterStatus === status ? "" : status)}
                          >
                              {status.replace("_", " ")}
                          </button>
                      ))}
                  </div>
              )}
          </div>

          {loading && (
              <div className="relative w-full h-full bg-gray-100">
                  {/* Skeleton Background */}
                  <LoadingValidationDocument/>

                  {/* Spinner and Text in Center */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                      <Spinner size="xl" color="gray"/>
                      <p className="text-gray-600 font-medium">
                          Loading, mohon tunggu...
                      </p>
                  </div>
              </div>
          )}

          {/* Student Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {!loading && (
                  filteredStudents.map((student) => (
                      <div key={student.id} className="relative">
                          <ValidationCard
                              student={{
                                  name: student.name,
                                  nim: student.nim,
                                  documentStatus: student.documentStatus,
                                  status: student.status,
                                  photoPath: student.photoPath,
                                  email: student.email,
                                  noHp: student.noHp,
                                  semester: student.semester,
                              }}
                              variant="default"
                              className="h-full cursor-pointer"
                              onClick={() => handleCardClick(student)}
                          />
                      </div>
                  ))
              )}
          </div>

          {/* Validation Modal */}
          {showDialog && activeDocument && (
              <ValidationModal
                  activeDocument={{
                      ...activeDocument,
                      documentStatus: activeDocument.documentStatus,
                  }}
                  groupedDocuments={selectedStudentDocs}
                  onClose={() => {
                      setShowDialog(false);
                      setActiveDocument(null);
                      setSelectedStudentDocs({
                          PERSYARATAN: [],
                          PENDAFTARAN: [],
                          PASCA_SEMINAR: []
                      });
                  }}
                  onSave={(documents) => {
                      const promises = documents.map(doc =>
                          updateDocumentStatus(doc.id, doc.status, doc.komentar)
                      );
                      Promise.all(promises).then(() => {
                          setShowDialog(false);
                          setActiveDocument(null);
                          setSelectedStudentDocs({
                              PERSYARATAN: [],
                              PENDAFTARAN: [],
                              PASCA_SEMINAR: []
                          });
                      });
                  }}
              />
          )}
      </div>
  );
};

export default Validasi;