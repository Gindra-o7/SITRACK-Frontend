import React from "react";
import { X } from "lucide-react";
import FileItem from "../../components/File.Item";

interface MenungguProps {
  title: string;
  text?: string;
  isOpen: boolean;
  onClose: () => void;
  notes?: string[];
}

// Dummy documents with mixed statuses
const documentData = [
  {
    name: "Surat keterangan selesai KP dari instansi",
    status: "menunggu",
  },
  {
    name: "Daily Report Kerja Praktik - Minggu 1",
    status: "menunggu",
  },
  {
    name: "Daily Report Kerja Praktik - Minggu 2",
    status: "menunggu",
  },
  {
    name: "Daily Report Kerja Praktik - Minggu 3",
    status: "menunggu",
  },
  {
    name: "Daily Report Kerja Praktik - Minggu 4",
    status: "menunggu",
  },
  {
    name: "Daily Report Kerja Praktik - Minggu 5",
    status: "menunggu",
  },
  {
    name: "Laporan Akhir Kerja Praktik",
    status: "menunggu",
  },
];

const Menunggu: React.FC<MenungguProps> = ({
  title,
  text,
  isOpen,
  onClose,
  notes = [],
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-yellow-500 dark:bg-gray-900 p-6 border-b sticky top-0 z-50">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-white text-xl font-medium dark:text-white">
                {title} <span className="font-bold">Menunggu Validasi!</span>
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
              {documentData.map((doc, index) => (
                <FileItem
                  key={index}
                  item={doc.name}
                  status={doc.status as "menunggu" | "diterima" | "revisi"}
                />
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
              Total: {documentData.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menunggu;