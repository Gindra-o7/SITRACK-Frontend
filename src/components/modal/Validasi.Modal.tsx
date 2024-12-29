import { useState, useEffect } from 'react';
import { File, FileCheck, FileX, Lock, RotateCcw, CheckSquare, XCircle, CheckCircle, SquareArrowOutUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Document {
  id: string;
  jenisDokumen: string;
  kategori: string;
  status: string;
  tanggalUpload: string;
  filePath: string;
  komentar?: string;
}

interface GroupedDocuments {
  PERSYARATAN: Document[];
  PENDAFTARAN: Document[];
  PASCA_SEMINAR: Document[];
}

type DocumentStatus = 'verified' | 'rejected' | null;
type TabKey = 'PERSYARATAN' | 'PENDAFTARAN' | 'PASCA_SEMINAR';

interface ValidationModalProps {
  activeDocument: {
    id: string;
    title: string;
    documentStatus: TabKey;
  };
  groupedDocuments: GroupedDocuments;
  onClose: () => void;
  onSave: (documents: Document[]) => void;
}

const ValidationModal = ({
                           activeDocument,
                           groupedDocuments,
                           onClose,
                           onSave,
                         }: ValidationModalProps) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentTab, setCurrentTab] = useState<TabKey>(activeDocument.documentStatus);
  const [comments, setComments] = useState<Record<string, string>>({});

  useEffect(() => {
    // Set initial documents based on the current tab
    const currentDocs = groupedDocuments[currentTab] || [];
    setDocuments(currentDocs);

    // Initialize comments from existing documents
    const initialComments: Record<string, string> = {};
    currentDocs.forEach(doc => {
      if (doc.komentar) {
        initialComments[doc.id] = doc.komentar;
      }
    });
    setComments(initialComments);
  }, [currentTab, groupedDocuments]);

  const isTabAccessible = (tab: TabKey) => {
    const order: TabKey[] = ["PERSYARATAN", "PENDAFTARAN", "PASCA_SEMINAR"];
    return order.indexOf(tab) <= order.indexOf(activeDocument.documentStatus);
  };

  const handleStatus = (docId: string, newStatus: DocumentStatus) => {
    setDocuments(docs =>
        docs.map(doc =>
            doc.id === docId
                ? {
                  ...doc,
                  status: doc.status === newStatus ? doc.status : newStatus,
                }
                : doc
        )
    );
  };

  const handleComment = (docId: string, comment: string) => {
    setComments(prev => ({
      ...prev,
      [docId]: comment
    }));
  };

  const handleBulkAction = (status: DocumentStatus) => {
    setDocuments(docs =>
        docs.map(doc => ({
          ...doc,
          status: status || doc.status,
        }))
    );

    if (status !== 'rejected') {
      setComments({});
    }
  };

  const handleSave = () => {
    const updatedDocs = documents.map(doc => ({
      ...doc,
      komentar: comments[doc.id] || undefined
    }));

    const isValid = updatedDocs.every(
        doc => doc.status && (doc.status !== 'rejected' || comments[doc.id]?.trim())
    );

    if (!isValid) {
      alert(
          documents.some(doc => !doc.status)
              ? "Harap validasi semua dokumen"
              : "Harap isi komentar untuk dokumen yang perlu rejected"
      );
      return;
    }

    onSave(updatedDocs);
    onClose();
  };

  const counts = {
    approved: documents.filter(doc => doc.status === 'verified').length,
    rejected: documents.filter(doc => doc.status === 'rejected').length,
    total: documents.length,
  };

  const handleOpenDocument = (filePath: string) => {
    window.open(`http://localhost:5000/${filePath}`, '_blank');
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl">
          {/* Header */}
          <div className="sticky top-0 bg-gray-100 p-4 rounded-t-lg border-b">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {activeDocument.title}
            </h2>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2 overflow-x-auto">
                {Object.keys(groupedDocuments).map((tab) => {
                  const isLocked = !isTabAccessible(tab as TabKey);
                  return (
                      <button
                          key={tab}
                          onClick={() => !isLocked && setCurrentTab(tab as TabKey)}
                          disabled={isLocked}
                          className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                      ${
                              currentTab === tab
                                  ? "bg-blue-100 text-blue-700"
                                  : isLocked
                                      ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                                      : "hover:bg-gray-100 text-gray-600"
                          }
                    `}
                      >
                        {isLocked && <Lock className="w-4 h-4" />}
                        {tab.replace('_', ' ')}
                      </button>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <button
                    onClick={() => handleBulkAction(null)}
                    className="group flex items-center gap-1 px-3 py-2 text-sm bg-gray-50 border rounded-lg hover:bg-gray-100"
                >
                  <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                  Reset
                </button>
                <button
                    onClick={() => handleBulkAction('verified')}
                    className="group flex items-center gap-1 px-3 py-2 text-sm bg-green-50 border-green-200 text-green-700 rounded-lg hover:bg-green-100"
                >
                  <CheckSquare className="w-4 h-4" />
                  Setujui Semua
                </button>
                <button
                    onClick={() => handleBulkAction('rejected')}
                    className="group flex items-center gap-1 px-3 py-2 text-sm bg-red-50 border-red-200 text-red-700 rounded-lg hover:bg-red-100"
                >
                  <XCircle className="w-4 h-4" />
                  Revisi Semua
                </button>
              </div>
            </div>
          </div>

          {/* Document List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {documents.map((doc) => (
                <div key={doc.id} className="border rounded-lg p-3">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-3 w-full">
                      {doc.status === 'verified' ? (
                          <FileCheck className="w-6 h-6 text-green-500" />
                      ) : doc.status === 'rejected' ? (
                          <FileX className="w-6 h-6 text-red-500" />
                      ) : (
                          <File className="w-6 h-6 text-gray-500" />
                      )}
                      <span className="font-medium text-sm truncate">{doc.jenisDokumen}</span>
                      <span className="text-xs text-gray-500">
                    Diupload: {new Date(doc.tanggalUpload).toLocaleDateString('id-ID')}
                  </span>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto justify-center">
                      <button
                          onClick={() => handleOpenDocument(doc.filePath)}
                          className="px-2 py-1 text-xs sm:text-sm rounded-lg border flex items-center gap-1 hover:bg-gray-50"
                      >
                        <SquareArrowOutUpRight className="w-4 h-4" />
                        Buka
                      </button>
                      {['verified', 'rejected'].map((status) => (
                          <button
                              key={status}
                              onClick={() => handleStatus(doc.id, status as DocumentStatus)}
                              className={`px-2 py-1 text-xs sm:text-sm rounded-lg flex items-center gap-1 
                        ${
                                  doc.status === status
                                      ? status === 'verified'
                                          ? "bg-green-100 text-green-700"
                                          : "bg-red-100 text-red-700"
                                      : "border hover:bg-gray-50"
                              }`}
                          >
                            {status === 'verified' ? (
                                <CheckCircle className="w-4 h-4" />
                            ) : (
                                <XCircle className="w-4 h-4" />
                            )}
                            {status === 'verified' ? "Setuju" : "Revisi"}
                          </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {doc.status === 'rejected' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3"
                        >
                    <textarea
                        className="w-full p-2 text-sm border rounded-lg resize-none h-20"
                        placeholder="Tambahkan komentar ..."
                        value={comments[doc.id] || ''}
                        onChange={(e) => handleComment(doc.id, e.target.value)}
                    />
                        </motion.div>
                    )}
                  </AnimatePresence>
                </div>
            ))}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white p-4 border-t rounded-b-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-md">
                  <FileCheck className="w-4 h-4" />
                  <span className="text-sm font-medium">
                  {counts.approved}/{counts.total}
                </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-md">
                  <FileX className="w-4 h-4" />
                  <span className="text-sm font-medium">
                  {counts.rejected}/{counts.total}
                </span>
                </div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm"
                >
                  Batal
                </button>
                <button
                    onClick={handleSave}
                    className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
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