import React from "react";
import { X } from "lucide-react";
import FileItem from "../../components/File.Item";

type StatusType = "diterima" | "menunggu" | "revisi";

interface StatusModalProps {
  title: string;
  status: StatusType;
  text?: string;
  isOpen: boolean;
  onClose: () => void;
  documents: Array<{
    name: string;
    status: StatusType;
  }>;
  notes?: string[];
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

const FileModal: React.FC<StatusModalProps> = ({
  title,
  status,
  text,
  isOpen,
  onClose,
  documents,
  notes = [],
}) => {
  if (!isOpen) return null;

  const { bgColor, statusText } = getStatusConfig(status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div
          className={`${bgColor} dark:bg-gray-900 p-6 border-b sticky top-0 z-50`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-white text-xl font-medium dark:text-white">
                {title} <span className="font-bold">{statusText}</span>
              </h2>
            </div>
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
          <div>
            <h3 className="text-lg font-semibold mb-3 dark:text-white">
              Nama Berkas
            </h3>
            <div className="space-y-2">
              {documents.map((doc, index) => (
                <FileItem key={index} item={doc.name} status={doc.status} />
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
              Total: {documents.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileModal;
