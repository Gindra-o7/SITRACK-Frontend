import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  FileText,
  ChevronDown,
  MessageSquare,
  User,
  Clock,
} from "lucide-react";
import { ProgressSteps, NavigationButtons, STEPS } from "../../components/Step";
import ValidationModal from "../../components/Modal/Validasi.Modal";

const Validasi = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [comments, setComments] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);

  const students = [
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
  ];

  const stepDocuments = [
    {
      id: 0,
      title: "Persyaratan",
      description: "Syarat-syarat untuk mendaftar seminar",
      documents: [
        { id: 1, name: "Kartu Hasil Studi (KHS)", status: "menunggu" },
        { id: 2, name: "Bukti pembayaran KP", status: "revisi" },
        { id: 3, name: "Kartu Bimbingan KP", status: "setuju" },
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
      ],
    },
  ];

  const [statuses, setStatuses] = useState<Record<string, string>>({});

  const handleValidateDocument = (docId, status) => {
    setStatuses((prev) => ({
      ...prev,
      [`${selectedStudent.id}-${docId}`]: status,
    }));
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

  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  const handlePrevious = () => {
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(STEPS.length - 1, prev + 1));
  };

  return (
    <div className="container p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Validasi Dokumen Mahasiswa</h1>

      {/* Student List */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Daftar Mahasiswa</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors
                                    ${
                                      selectedStudent?.id === student.id
                                        ? "border-blue-500 bg-blue-50"
                                        : "hover:bg-gray-50"
                                    }`}
                onClick={() => setSelectedStudent(student)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">
                        NIM: {student.nim}
                      </p>
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
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedStudent && (
        <>
          <ProgressSteps
            activeStep={activeStep}
            onStepClick={handleStepClick}
          />

          {/* Document List */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {stepDocuments[activeStep].title}
                </h2>
                <span className="text-sm text-gray-500">
                  Submitted: {selectedStudent.submissionDate}
                </span>
              </div>
              <p className="text-gray-600 mt-1">
                {stepDocuments[activeStep].description}
              </p>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {stepDocuments[activeStep].documents.map((doc) => (
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
                            doc.status
                          )}`}
                        >
                          {getStatusIcon(doc.status)}
                          <span className="ml-1 capitalize">{doc.status}</span>
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
          </div>

          <NavigationButtons
            activeStep={activeStep}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </>
      )}

      {/* Validation Dialog */}
      {showDialog && activeDocument && selectedStudent && (
        <ValidationModal
          activeDocument={activeDocument}
          selectedStudent={selectedStudent}
          comments={comments}
          statuses={statuses} // Pass statuses to the modal
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
