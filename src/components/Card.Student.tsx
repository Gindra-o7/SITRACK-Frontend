import React from "react";

export type Student = {
  name: string;
  nim: string;
  department: string;
  status: "Menunggu Seminar" | "Selesai Seminar" | "Sedang Berlangsung";
  company: string;
  pembimbing: string;
  judulKP: string;
  action: "Input Nilai" | "Lihat Nilai";
};

type StudentCardProps = {
  student: Student;
  onActionClick: () => void;
};

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onActionClick,
}) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Sedang Berlangsung":
        return "bg-green-100 text-green-600";
      case "Menunggu Seminar":
        return "bg-yellow-100 text-yellow-600";
      case "Selesai Seminar":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getActionButtonClass = (status: string) => {
    switch (status) {
      case "Selesai Seminar":
        return "bg-gray-100 text-gray-600 hover:bg-gray-200";
      case "Sedang Berlangsung":
        return "bg-green-500 text-white hover:bg-green-600";
      default:
        return "bg-blue-500 text-white hover:bg-blue-600";
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            {student.name}
          </h3>
          <p className="text-gray-600 text-sm">NIM: {student.nim}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs sm:text-sm ${getStatusClass(
            student.status
          )}`}
        >
          {student.status}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <p className="text-gray-800 text-sm font-medium line-clamp-2">
          {student.judulKP}
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
        <p className="text-gray-600 text-sm flex justify-between">
          <span>Pembimbing:</span>
          <span className="font-medium">{student.pembimbing}</span>
        </p>
        <p className="text-gray-600 text-sm flex justify-between">
          <span>Tempat KP:</span>
          <span className="font-medium">{student.company}</span>
        </p>
      </div>

      <div className="mt-4">
        <button
          onClick={onActionClick}
          className={`w-full py-2 rounded-lg font-medium transition-colors ${getActionButtonClass(
            student.status
          )}`}
        >
          {student.action}
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
