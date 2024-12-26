import React from "react";
import { X, Files } from "lucide-react";
import { StatusModalProps } from "../../interfaces/common.interfaces"

type StatusType = "diterima" | "menunggu" | "revisi";

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
            <div className="space-y-2">
              {documents.map((doc, index) => (
                  <div
                      key={index}
                      className="flex justify-between items-center bg-gray-100 p-3 rounded-md hover:bg-gray-200 cursor-pointer"
                  >
                    <span className="text-gray-800 dark:text-white flex"
                          onClick={() => onDocumentClick(doc.filePath)}
                    >
                      <Files/>
                      {doc.name}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                  {doc.status.toUpperCase()}
                </span>
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