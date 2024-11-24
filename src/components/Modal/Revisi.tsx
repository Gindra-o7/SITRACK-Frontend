import React from "react";
import { X } from "lucide-react";
import FileAccordionItem from "../../components/File.Accordion";

interface RevisiProps {
  title: string;
  text?: string;
  isOpen: boolean;
  onClose: () => void;
  notes?: string[];
}

const Revisi: React.FC<RevisiProps> = ({
                                         title,
                                         text,
                                         isOpen,
                                         onClose,
                                         notes = []
                                       }) => {
  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-red-500 dark:bg-gray-900 p-6 border-b sticky top-0 z-50">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-white text-xl font-medium dark:text-white">
                  {title} <span className="font-bold">Ditolak!</span>
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
                {[
                  "Surat keterangan selesai kp dari instansi",
                  ...Array(6).fill("Daily Report Kerja Praktik"),
                ].map((item: string, index: number) => (
                    <FileAccordionItem key={index} item={item} />
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
                Total: 7
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Revisi;