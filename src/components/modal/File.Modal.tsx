import React, {useState} from "react";
import {X, Files, ChevronUp, ChevronDown} from "lucide-react";
import { StatusModalProps } from "../../interfaces/common.interfaces"

type StatusType = "diterima" | "menunggu" | "revisi";

interface DocumentHistory {
    id: string;
    tanggalUpload: string;
    komentar: string;
    user: {
        nama: string;
        email: string;
    };
}

interface Document {
    name: string;
    status: "submitted" | "verified" | "rejected";
    filePath: string;
    history: DocumentHistory[];
}

const getStatusConfig = (status: StatusType) => {
  switch (status) {
    case "diterima":
      return {
        bgColor: "bg-green-500",
        statusText: "Diterima!",
      };
    case "menunggu":
      return {
        bgColor: "bg-yellow-500",
        statusText: "Menunggu Validasi!",
      };
    case "revisi":
      return {
        bgColor: "bg-red-500",
        statusText: "Ditolak!",
      };
  }
};

const DocumentHistory: React.FC<{ history: DocumentHistory[] }> = ({ history }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (history.length === 0) return null;

    return (
        <div className="mt-2">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-800"
            >
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                <span className="ml-1">Riwayat Komentar ({history.length})</span>
            </button>

            {isExpanded && (
                <div className="mt-2 space-y-2">
                    {history.map((item) => (
                        <div key={item.id} className="bg-gray-50 p-3 rounded-md">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>{item.user.nama}</span>
                                <span>{new Date(item.tanggalUpload).toLocaleDateString()}</span>
                            </div>
                            <p className="mt-1 text-sm text-gray-800">{item.komentar}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const FileModal: React.FC<StatusModalProps> = ({
                                                   title,
                                                   status,
                                                   isOpen,
                                                   onClose,
                                                   documents,
                                                   onDocumentClick,
                                               }) => {
    if (!isOpen) return null;

    const { bgColor, statusText } = getStatusConfig(status);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className={`${bgColor} dark:bg-gray-900 p-6 border-b sticky top-0 z-50`}>
                    <div className="flex justify-between items-start">
                        <h2 className="text-white text-xl font-medium dark:text-white">
                            {title} <span className="font-bold">{statusText}</span>
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">Nama Berkas</h3>
                    <div className="space-y-4">
                        {documents.map((doc, index) => (
                            <div key={index} className="bg-gray-100 p-3 rounded-md">
                                <div
                                    className="flex justify-between items-center hover:bg-gray-200 cursor-pointer rounded-md p-2"
                                    onClick={() => onDocumentClick(doc.filePath)}
                                >
                  <span className="text-gray-800 dark:text-white flex items-center gap-2">
                    <Files size={20} />
                      {doc.name}
                  </span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                    {doc.status.toUpperCase()}
                  </span>
                                </div>
                                <DocumentHistory history={doc.history} />
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
                        Total: {documents.length}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileModal;