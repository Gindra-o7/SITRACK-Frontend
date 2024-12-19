import React, { useState } from "react";
import { FileX, ChevronDown, FileCheck, FileClock } from "lucide-react";

interface FileAccordionItemProps {
    item: string;
    status: "menunggu" | "diterima" | "revisi";
}

const FileItem: React.FC<FileAccordionItemProps> = ({ item, status }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const statusConfig = {
        menunggu: {
            icon: <FileClock className="w-5 h-5 text-yellow-500" />,
            noteColor: "text-gray-600 dark:text-gray-300",
        },
        diterima: {
            icon: <FileCheck className="w-5 h-5 text-green-500" />,
            noteColor: "text-green-700 dark:text-green-300",
        },
        revisi: {
            icon: <FileX className="w-5 h-5 text-red-500" />,
            noteColor: "text-red-700 dark:text-red-300",
        },
    };

    const { icon: StatusIcon, noteColor } = statusConfig[status];

    const handleViewDocument = () => {
        alert(`Melihat dokumen: ${item}`);
    };

    return (
        <div className="mb-2">
            <div
                className={`flex items-center justify-between p-3 border border-gray-300 rounded-lg transition-colors`}
            >
                <div className="flex items-center gap-3">
                    <div className="text-gray-600 flex items-center">{StatusIcon}</div>
                    <button className="text-sm text-gray-700 dark:text-gray-200">
                        {item}
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    {status == "revisi" && (
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600"
                        >
                            <ChevronDown
                                className={`w-5 h-5 transition-transform duration-200 ${
                                    isOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                    )}
                </div>
            </div>

            {status == "revisi" && (
                <div
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div
                        className={`p-4 bg-white border-x border-b border-gray-300 rounded-b-lg dark:bg-gray-800 dark:border-gray-700`}
                    >
                        <div className="flex items-center mb-2">
                            <h4 className="font-medium text-sm mr-2 dark:text-white">
                                Catatan:
                            </h4>
                        </div>
                        <p className={`text-sm ${noteColor}`}>
                            {status === "revisi"
                                ? "Dokumen memerlukan revisi. Silakan periksa catatan dan perbaiki."
                                : null}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileItem;