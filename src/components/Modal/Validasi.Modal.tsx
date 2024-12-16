import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  SquareArrowOutUpRight,
  File,
  FileX,
  FileCheck,
  RotateCcw,
  CheckSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Document {
  id: number;
  name: string;
  status: "setuju" | "revisi" | null;
  comment: string;
  showComment: boolean;
}

interface Examiner {
  id: number;
  name: string;
  department: string;
}

interface ActiveDocument {
  title: string;
  documentStatus: keyof typeof documentLists;
}

interface ValidationModalProps {
  activeDocument: {
    id: number;
    title: string;
    documentStatus: keyof typeof documentLists;
  };
  onClose: () => void;
  onSave: (documents: Document[]) => void;
}

const documentLists = {
  Persyaratan: [
    "Surat Keterangan Selesai KP dari Instansi",
    "Lembar Pernyataan Telah Selesai",
    "Daily Report",
    "Laporan Tambahan Tugas KP",
    "Surat Bimbingan Dosen Pembimbing",
    "Setoran Hafalan Surat 1 - 16 Pada Juz",
    "Form Kehadiran Pada Seminar KP",
  ],
  Pendaftaran: [
    "Surat Keterangan Selesai KP dari Instansi",
    "Lembar Pernyataan Telah Selesai",
    "Daily Report",
    "Laporan Tambahan Tugas KP",
    "Surat Bimbingan Dosen Pembimbing",
    "Setoran Hafalan Surat 1 - 16 Pada Juz",
    "Form Kehadiran Pada Seminar KP",
  ],
  "Pasca Seminar": [
    "Surat Undangan Seminar Hasil KP",
    "Berita Acara Seminar",
    "Daftar Hadir Seminar",
    "Lembar Pengesahan KP",
  ],
} as const;

const ValidationModal: React.FC<ValidationModalProps> = ({
  activeDocument,
  onClose,
  onOpenDocument,
  onSave,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const documentList = documentLists[activeDocument.documentStatus] || [];
    const initialDocuments: Document[] = documentList.map((name, index) => ({
      id: index + 1,
      name,
      status: null,
      comment: "",
      showComment: false,
    }));
    setDocuments(initialDocuments);
  }, [activeDocument.documentStatus]);

  const [examiners] = useState<Examiner[]>([
    { id: 1, name: "Dr. Ahmad Sutisna, M.Pd.", department: "Pendidikan" },
    {
      id: 2,
      name: "Prof. Dr. Siti Rahayu, S.Kom., M.T.",
      department: "Teknologi Informasi",
    },
    {
      id: 3,
      name: "Dr. Bambang Widodo, S.Pd., M.Si.",
      department: "Manajemen Pendidikan",
    },
  ]);

  const [selectedExaminer, setSelectedExaminer] = useState<string>("");
  const [isAllDocumentsApproved, setIsAllDocumentsApproved] = useState(false);

  const handleStatus = (docId: number, status: "setuju" | "revisi") => {
    setDocuments((docs) =>
      docs.map((doc) => {
        if (doc.id === docId) {
          const newStatus = doc.status === status ? null : status;
          return {
            ...doc,
            status: newStatus,
            showComment: newStatus === "revisi",
            comment: newStatus !== "revisi" ? "" : doc.comment,
          };
        }
        return doc;
      })
    );

    const allApproved = documents.every((doc) => doc.status === "setuju");
    setIsAllDocumentsApproved(allApproved);
    if (!allApproved) {
      setSelectedExaminer("");
    }
  };

  const handleComment = (docId: number, comment: string) => {
    setDocuments((docs) =>
      docs.map((doc) => (doc.id === docId ? { ...doc, comment } : doc))
    );
  };

  const getDocumentIcon = (status: Document["status"]) => {
    switch (status) {
      case "setuju":
        return <FileCheck className="w-6 h-6 text-green-500" />;
      case "revisi":
        return <FileX className="w-6 h-6 text-red-500" />;
      default:
        return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  const resetDocuments = () => {
    setDocuments((docs) =>
      docs.map((doc) => ({
        ...doc,
        status: null,
        comment: "",
        showComment: false,
      }))
    );
    setIsAllDocumentsApproved(false);
    setSelectedExaminer("");
  };

  const approveAllDocuments = () => {
    setDocuments((docs) =>
      docs.map((doc) => ({
        ...doc,
        status: "setuju",
        comment: "",
        showComment: false,
      }))
    );
    setIsAllDocumentsApproved(true);
  };

  const getDocumentCounts = () => {
    const approved = documents.filter((doc) => doc.status === "setuju").length;
    const rejected = documents.filter((doc) => doc.status === "revisi").length;
    const total = documents.length;
    return { approved, rejected, total };
  };

  const reviseAllDocuments = () => {
    setDocuments((docs) =>
      docs.map((doc) => ({ ...doc, status: "revisi", showComment: true }))
    );
    setIsAllDocumentsApproved(false);
    setSelectedExaminer("");
  };

  const handleSave = () => {
    const allValidated = documents.every((doc) => doc.status);
    if (!allValidated) {
      alert("Harap validasi semua dokumen");
      return;
    }

    const allCommentsProvided = documents.every(
      (doc) =>
        doc.status !== "revisi" ||
        (doc.status === "revisi" && doc.comment.trim())
    );
    if (!allCommentsProvided) {
      alert("Harap isi komentar untuk dokumen yang perlu revisi");
      return;
    }

    if (
      isAllDocumentsApproved &&
      activeDocument.documentStatus === "Pendaftaran"
    ) {
      if (!selectedExaminer) {
        alert("Harap pilih dosen penguji");
        return;
      }
    }

    console.log("Saving documents:", documents);
    console.log("Selected Examiner:", selectedExaminer);
    onClose();
    onSave(documents);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl">
        <div className="sticky top-0 bg-gray-100 p-4 rounded-t-lg border-b border-gray-200 z-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex-grow">
              {activeDocument.title}
            </h2>
          </div>
        </div>

        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex justify-end gap-3">
            <button
              onClick={resetDocuments}
              className="group flex items-center gap-2 px-4 py-2 text-sm bg-gray-50 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              <span className="font-medium">Reset</span>
            </button>
            <button
              onClick={approveAllDocuments}
              className="group flex items-center gap-2 px-4 py-2 text-sm bg-green-50 border border-green-200 text-green-700 rounded-lg hover:bg-green-100 hover:border-green-300 transition-all duration-200"
            >
              <CheckSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Setujui Semua</span>
            </button>
            <button
              onClick={reviseAllDocuments}
              className="group flex items-center gap-2 px-4 py-2 text-sm bg-red-50 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200"
            >
              <XCircle className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Revisi Semua</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="flex items-center gap-3 w-full truncate">
                    {getDocumentIcon(doc.status)}
                    <span className="font-medium text-sm  text-center sm:text-left w-full truncate flex-row">
                      {doc.name}
                    </span>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto justify-center">
                    <button
                      onClick={() => handleOpenDocument(doc.id)}
                      className="px-2 py-1 text-xs sm:text-sm rounded-lg border flex items-center gap-1 hover:bg-gray-50 transition-colors"
                    >
                      <SquareArrowOutUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      Buka
                    </button>
                    <button
                      onClick={() => handleStatus(doc.id, "setuju")}
                      className={`px-2 py-1 text-xs sm:text-sm rounded-lg flex items-center gap-1 ${
                        doc.status === "setuju"
                          ? "bg-green-100 text-green-700"
                          : "border hover:bg-gray-50"
                      }`}
                    >
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      Setuju
                    </button>
                    <button
                      onClick={() => handleStatus(doc.id, "revisi")}
                      className={`px-2 py-1 text-xs sm:text-sm rounded-lg flex items-center gap-1 ${
                        doc.status === "revisi"
                          ? "bg-red-100 text-red-700"
                          : "border hover:bg-gray-50"
                      }`}
                    >
                      <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      Revisi
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {doc.status === "revisi" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.1 }}
                      className="mt-3 overflow-hidden"
                    >
                      <textarea
                        className="w-full p-2 text-sm border rounded-lg resize-none h-20"
                        placeholder="Tambahkan komentar revisi..."
                        value={doc.comment}
                        onChange={(e) => handleComment(doc.id, e.target.value)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {isAllDocumentsApproved &&
            activeDocument.documentStatus === "Pendaftaran" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div>
                  <label
                    htmlFor="examiner-select"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Dosen Penguji
                  </label>
                  <select
                    id="examiner-select"
                    value={selectedExaminer}
                    onChange={(e) => setSelectedExaminer(e.target.value)}
                    className="w-full p-2 border rounded-lg text-sm"
                  >
                    <option value="" disabled>
                      Pilih Dosen Penguji
                    </option>
                    {examiners.map((examiner) => (
                      <option key={examiner.id} value={examiner.id}>
                        {examiner.name} - {examiner.department}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}

          {!isAllDocumentsApproved &&
            activeDocument.documentStatus === "Pendaftaran" && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
                <p className="text-sm text-yellow-800">
                  Dokumen harus disetujui semua untuk memilih dosen penguji
                </p>
              </div>
            )}
        </div>

        <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 rounded-b-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-md">
                <FileCheck className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {getDocumentCounts().approved}/{getDocumentCounts().total}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-md">
                <FileX className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {getDocumentCounts().rejected}/{getDocumentCounts().total}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;
