import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  User,
  Clock,
  BookOpen,
} from "lucide-react";
import { ProgressSteps, NavigationButtons, STEPS } from "../../components/Step";
import ValidationModal from "../../components/Modal/Validasi.Modal";

const Validasi = () => {
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [activeSteps, setActiveSteps] = useState({});
  const [comments, setComments] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);
  const [selectedExaminers, setSelectedExaminers] = useState({});
  const [statuses, setStatuses] = useState({});

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ahmad Fajar",
      nim: "19001",
      submissionDate: "2024-03-15",
      status: "menunggu",
    },
    {
      id: 2,
      name: "Budi Santoso",
      nim: "19002",
      submissionDate: "2024-03-14",
      status: "revisi",
    },
    {
      id: 3,
      name: "Clara Devi",
      nim: "19003",
      submissionDate: "2024-03-13",
      status: "setuju",
    },
    {
      id: 4,
      name: "Dewi Sari",
      nim: "19004",
      submissionDate: "2024-03-12",
      status: "menunggu",
    },
    {
      id: 5,
      name: "Eka Putra",
      nim: "19005",
      submissionDate: "2024-03-11",
      status: "setuju",
    },
    {
      id: 6,
      name: "Farah Lubis",
      nim: "19006",
      submissionDate: "2024-03-10",
      status: "revisi",
    },
    {
      id: 7,
      name: "Gilang Pratama",
      nim: "19007",
      submissionDate: "2024-03-09",
      status: "menunggu",
    },
    {
      id: 8,
      name: "Hendra Wijaya",
      nim: "19008",
      submissionDate: "2024-03-08",
      status: "setuju",
    },
    {
      id: 9,
      name: "Indah Wulandari",
      nim: "19009",
      submissionDate: "2024-03-07",
      status: "revisi",
    },
    {
      id: 10,
      name: "Joko Saputra",
      nim: "19010",
      submissionDate: "2024-03-06",
      status: "menunggu",
    },
    {
      id: 11,
      name: "Kartika Sari",
      nim: "19011",
      submissionDate: "2024-03-05",
      status: "setuju",
    },
    {
      id: 12,
      name: "Lukman Hakim",
      nim: "19012",
      submissionDate: "2024-03-04",
      status: "revisi",
    },
    {
      id: 13,
      name: "Maya Rizki",
      nim: "19013",
      submissionDate: "2024-03-03",
      status: "menunggu",
    },
  ]);

  const [stepDocuments] = useState([
    {
      id: 0,
      title: "Persyaratan",
      description: "Syarat-syarat untuk mendaftar seminar",
      documents: [
        { id: 1, name: "Kartu Hasil Studi (KHS)", status: "menunggu" },
        { id: 2, name: "Bukti pembayaran KP", status: "menunggu" },
        { id: 3, name: "Kartu Bimbingan KP", status: "menunggu" },
        { id: 10, name: "Surat Pengajuan Seminar", status: "menunggu" },
        { id: 11, name: "Daftar Kehadiran Bimbingan", status: "menunggu" },
        { id: 12, name: "Rekomendasi Dosen Pembimbing", status: "menunggu" },
        { id: 13, name: "Fotokopi KTP", status: "menunggu" },
      ],
    },
    {
      id: 1,
      title: "Pendaftaran",
      description: "Berkas-berkas pendaftaran seminar",
      documents: [
        { id: 4, name: "Form Pendaftaran Seminar", status: "menunggu" },
        { id: 5, name: "Laporan KP (draft)", status: "menunggu" },
        { id: 6, name: "Surat Keterangan Selesai KP", status: "menunggu" },
        { id: 14, name: "Fotokopi Sertifikat KP", status: "menunggu" },
        { id: 15, name: "Bukti Pengumpulan Laporan KP", status: "menunggu" },
        { id: 16, name: "Surat Kesediaan Penguji", status: "menunggu" },
        { id: 17, name: "Kartu Seminar", status: "menunggu" },
      ],
    },
    {
      id: 2,
      title: "Pasca-Seminar",
      description: "Berkas setelah pelaksanaan seminar",
      documents: [
        { id: 7, name: "Laporan KP (final)", status: "menunggu" },
        { id: 8, name: "Berita Acara Seminar", status: "menunggu" },
        { id: 9, name: "Form Nilai KP", status: "menunggu" },
        { id: 18, name: "Fotokopi Transkrip Nilai", status: "menunggu" },
        { id: 19, name: "Surat Ucapan Terima Kasih", status: "menunggu" },
        { id: 20, name: "Form Evaluasi Seminar", status: "menunggu" },
        { id: 21, name: "Dokumentasi Seminar", status: "menunggu" },
      ],
    },
  ]);

  const examiners = [
    { id: 1, name: "Dr. Adi Suryanto, M.Kom", nidn: "0001018701" },
    { id: 2, name: "Prof. Dr. Sri Wahyuni, S.T., M.T.", nidn: "0002127601" },
    { id: 3, name: "Ir. Budi Prasetyo, M.Sc.", nidn: "0003096502" },
    { id: 4, name: "Dr. Dewi Rahmawati, S.T., M.Kom", nidn: "0004037703" },
  ];

  const handleValidateDocument = (docId, status) => {
    setStatuses((prev) => ({
      ...prev,
      [`${expandedStudent}-${docId}`]: status,
    }));

    const student = students.find((s) => s.id === expandedStudent);
    if (!student) return;

    const currentStep = activeSteps[expandedStudent] || 0;
    const currentStepDocuments = stepDocuments[currentStep].documents;
    const allDocumentsValidated = currentStepDocuments.every(
      (doc) =>
        statuses[`${expandedStudent}-${doc.id}`] === "setuju" ||
        doc.status === "setuju"
    );

    if (allDocumentsValidated) {
      setStudents((prevStudents) =>
        prevStudents.map((s) =>
          s.id === expandedStudent
            ? { ...s, status: status === "revisi" ? "revisi" : "setuju" }
            : s
        )
      );
    }
  };

  const handleCommentSubmit = (studentId, docId, comment) => {
    setComments((prev) => ({
      ...prev,
      [`${studentId}-${docId}`]: comment,
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "setuju":
        return "text-green-500";
      case "revisi":
        return "text-red-500";
      case "menunggu":
        return "text-yellow-400";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "setuju":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "revisi":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "menunggu":
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleStepChange = (studentId, step) => {
    setActiveSteps((prev) => ({
      ...prev,
      [studentId]: step,
    }));
  };

  const isAllPendaftaranDocumentsApproved = (studentId) => {
    const pendaftaranStep = stepDocuments[1];
    return pendaftaranStep.documents.every(
      (doc) =>
        doc.status === "setuju" ||
        statuses[`${studentId}-${doc.id}`] === "setuju"
    );
  };

  const handleExaminerSelection = (studentId, examiner) => {
    setSelectedExaminers((prev) => ({
      ...prev,
      [studentId]: examiner,
    }));
  };

  const handleStudentClick = (studentId) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  return (
    <div className="container p-4 md:p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Validasi Dokumen Mahasiswa</h1>

      <div className="space-y-4">
        {students.map((student) => (
          <div key={student.id} className="bg-white rounded-lg shadow-sm">
            {/* Student Header */}
            <div
              className="p-4 cursor-pointer"
              onClick={() => handleStudentClick(student.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-500">NIM: {student.nim}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center ${getStatusColor(
                      student.status
                    )}`}
                  >
                    {getStatusIcon(student.status)}
                    <span className="ml-2 text-sm capitalize">
                      {student.status}
                    </span>
                  </div>
                  {expandedStudent === student.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedStudent === student.id && (
              <div className="border-t">
                <div className="p-4">
                  {/* Progress Steps */}
                  <ProgressSteps
                    activeStep={activeSteps[student.id] || 0}
                    onStepClick={(step) => handleStepChange(student.id, step)}
                  />

                  {/* Documents Section */}
                  <div className="mt-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">
                        {stepDocuments[activeSteps[student.id] || 0].title}
                      </h3>
                      <p className="text-gray-600">
                        {
                          stepDocuments[activeSteps[student.id] || 0]
                            .description
                        }
                      </p>
                    </div>

                    <div className="space-y-4">
                      {stepDocuments[
                        activeSteps[student.id] || 0
                      ].documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-500" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <div
                                className={`flex items-center text-sm ${getStatusColor(
                                  statuses[`${student.id}-${doc.id}`] ||
                                    doc.status
                                )}`}
                              >
                                {getStatusIcon(
                                  statuses[`${student.id}-${doc.id}`] ||
                                    doc.status
                                )}
                                <span className="ml-1 capitalize">
                                  {statuses[`${student.id}-${doc.id}`] ||
                                    doc.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50">
                              Preview
                            </button>
                            <button
                              className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 flex items-center"
                              onClick={() => {
                                setActiveDocument(doc);
                                setShowDialog(true);
                              }}
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Validasi
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Examiner Selection */}
                  {activeSteps[student.id] === 1 &&
                    isAllPendaftaranDocumentsApproved(student.id) && (
                      <div className="mt-6 border rounded-lg p-4">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold flex items-center">
                            <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
                            Pilih Dosen Penguji
                          </h3>
                          <p className="text-gray-600">
                            Silakan pilih dosen penguji untuk seminar mahasiswa
                          </p>
                        </div>

                        <div className="relative">
                          <select
                            className="w-full p-3 border rounded-lg appearance-none bg-white pr-10 cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={selectedExaminers[student.id]?.id || ""}
                            onChange={(e) => {
                              const examiner = examiners.find(
                                (ex) => ex.id === parseInt(e.target.value)
                              );
                              handleExaminerSelection(student.id, examiner);
                            }}
                          >
                            <option value="">Pilih Dosen Penguji</option>
                            {examiners.map((examiner) => (
                              <option key={examiner.id} value={examiner.id}>
                                {examiner.name} - NIDN: {examiner.nidn}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    )}

                  {/* Navigation Buttons */}
                  <div className="mt-6">
                    <NavigationButtons
                      activeStep={activeSteps[student.id] || 0}
                      onPrevious={() =>
                        handleStepChange(
                          student.id,
                          (activeSteps[student.id] || 0) - 1
                        )
                      }
                      onNext={() =>
                        handleStepChange(
                          student.id,
                          (activeSteps[student.id] || 0) + 1
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Validation Dialog */}
      {showDialog && activeDocument && expandedStudent && (
        <ValidationModal
          activeDocument={activeDocument}
          selectedStudent={students.find((s) => s.id === expandedStudent)}
          comments={comments}
          statuses={statuses}
          onClose={() => {
            setShowDialog(false);
            setActiveDocument(null);
          }}
          onValidate={handleValidateDocument}
          onCommentSubmit={handleCommentSubmit}
        />
      )}
    </div>
  );
};

export default Validasi;
