import React from "react";
import { ListChecks, Loader, FileX, MoveRight } from "lucide-react";

const CardUpload = ({ number, date, status, onStatusClick }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "revisi":
        return {
          background: "bg-gradient-to-r from-red-400 to-red-600",
          icon: <FileX className="w-5 h-5 mr-2 text-white" />,
          text: "Revisi",
        };
      case "diterima":
        return {
          background: "bg-gradient-to-r from-green-400 to-green-600",
          icon: <ListChecks className="w-5 h-5 mr-2 text-white" />,
          text: "Diterima",
        };
      case "menunggu":
        return {
          background: "bg-gradient-to-r from-yellow-400 to-yellow-600",
          icon: <Loader className="w-5 h-5 mr-2 text-white" />,
          text: "Menunggu",
        };
      default:
        return {
          background: "bg-gradient-to-r from-gray-400 to-gray-600",
          icon: null,
          text: "Status",
        };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <div
      className="p-6 rounded-lg shadow-lg mb-4 bg-gradient-to-br from-white/90 to-gray-100/50 
                 dark:from-gray-800/90 dark:to-gray-700/50 
                 border border-gray-200/50 dark:border-gray-700/50 
                 "
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Pengajuan #{number}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{date}</p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`
            flex items-center px-4 py-2 rounded-lg text-white 
            ${statusStyle.background} shadow-md
          `}
          >
            {statusStyle.icon}
            <span className="font-medium text-sm">{statusStyle.text}</span>
          </div>
          <button
            onClick={onStatusClick}
            disabled={status === "menunggu"}
            className={`
              inline-flex items-center px-4 py-2 text-sm font-medium 
              rounded-lg transition-all duration-300
              ${
                status === "menunggu"
                  ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                  : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:shadow-md focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
              }
            `}
          >
            View
            <MoveRight className="w-4 h-4 ms-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardUpload;
