import React from "react";
import { FileCheck, FileClock, FileX, ChevronRight } from "lucide-react";

type StatusType = "revisi" | "diterima" | "menunggu";

interface CardUploadProps {
  number: string | number;
  date: string;
  status: StatusType;
  onStatusClick: () => void;
}

const CardUpload: React.FC<CardUploadProps> = ({
  number,
  date,
  status,
  onStatusClick,
}) => {
  const getBackgroundColor = (): string => {
    if (status === "revisi") {
      return "bg-red-100";
    } else if (status === "diterima") {
      return "bg-green-100";
    } else {
      return "bg-yellow-100";
    }
  };

  const getStatusColor = (): string => {
    if (status === "revisi") {
      return "bg-red-500 text-white";
    } else if (status === "diterima") {
      return "bg-green-400 text-white";
    } else {
      return "bg-yellow-400 text-white";
    }
  };

  return (
    <div className={`p-4 rounded-xl mb-4 sm:p-6 ${getBackgroundColor()}`}>
      <div className="flex flex-col justify-between items-start sm:flex-row">
        <div>
          <div
            className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full mb-1 sm:mb-2 ${getStatusColor()}`}
          >
            {status === "revisi" && <FileX className="w-5 h-5 mr-1" />}
            {status === "diterima" && <FileCheck className="w-5 h-5 mr-1" />}
            {status === "menunggu" && <FileClock className="w-5 h-5 mr-1" />}
            {status}
          </div>
          <h5 className="text-2xl font-semibold tracking-tight text-gray-900 mt-4 ">
            Pengajuan #{number}
          </h5>
        </div>
        <div className="text-left sm:mt-0 sm:text-right">
          <p className="font-semibold text-gray-600 mb-1  sm:mb-2">{date}</p>
          <button
            onClick={onStatusClick}
            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 mt-4"
          >
            View
            <ChevronRight className="w-4 h-4 ms-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardUpload;
