import React from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export type Student = {
  name: string;
  nim: string;
  documentStatus: string;
  submissionDate: string;
  status: string;
};

type ValidationCardProps = {
  student: Student;
  variant?: "default" | "compact";
  onClick?: () => void;
  className?: string;
};

const getInitials = (name: string) => {
  const names = name.split(" ");
  return names.length > 1
    ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    : name.slice(0, 2).toUpperCase();
};

const colors = [
  "from-blue-500 to-blue-600",
  "from-green-500 to-green-600",
  "from-red-500 to-red-600",
  "from-purple-500 to-purple-600",
  "from-yellow-500 to-yellow-600",
  "from-pink-500 to-pink-600",
];

const getConsistentRandomColor = (uniqueKey: string) => {
  let hash = 0;
  for (let i = 0; i < uniqueKey.length; i++) {
    hash = uniqueKey.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "setuju":
      return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />;
    case "revisi":
      return <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />;
    case "menunggu":
      return <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />;
    default:
      return <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />;
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "setuju":
      return "bg-green-50 text-green-600 border border-green-200";
    case "revisi":
      return "bg-red-50 text-red-600 border border-red-200";
    case "menunggu":
      return "bg-yellow-50 text-yellow-600 border border-yellow-200";
    default:
      return "bg-gray-50 text-gray-600 border border-gray-200";
  }
};

const ValidationCard: React.FC<ValidationCardProps> = ({
  student,
  variant = "default",
  onClick,
  className = "",
}) => {
  const initials = getInitials(student.name);
  const consistentColor = getConsistentRandomColor(student.nim);
  const isCompact = variant === "compact";

  return (
    <div
      className={`
        bg-white rounded-lg border border-gray-200 
        hover:shadow-lg transition-all duration-200
        cursor-pointer relative overflow-hidden
        p-3 sm:p-4
        ${className}
      `}
      onClick={onClick}
    >
      {/* Submission Date */}
      <div className="absolute top-2 sm:top-3 right-2 sm:right-4">
        <span className="text-xs text-gray-500">{student.submissionDate}</span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Profile Initials */}
        <div
          className={`
            flex-shrink-0 flex items-center justify-center rounded-full
            bg-gradient-to-br ${consistentColor}
            text-white font-bold shadow-sm
            w-12 h-12 sm:w-16 sm:h-16
            text-base sm:text-xl
          `}
        >
          {initials}
        </div>

        {/* Content Container */}
        <div className="flex-grow min-w-0">
          {/* Top Row - Name */}
          <div className="flex items-start gap-2 mb-1.5 sm:mb-2">
            <div className="min-w-0">
              <h3
                className={`
                  font-semibold text-gray-900 truncate 
                  text-sm sm:text-base
                  w-full
                `}
              >
                {student.name}
              </h3>
              <p
                className={`
                  text-gray-500 
                  text-xs sm:text-sm
                `}
              >
                {student.nim}
              </p>
            </div>
          </div>

          {/* Bottom Row - Document Status and Status */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`
                inline-flex items-center gap-1 rounded-full 
                px-2 py-0.5 sm:px-2.5 sm:py-1
                text-[10px] sm:text-xs font-medium
               bg-blue-100 text-blue-600 border border-blue-200
              `}
            >
              {student.documentStatus}
            </span>
            <span
              className={`
                inline-flex items-center gap-1 sm:gap-1.5 rounded-full 
                px-2 py-0.5 sm:px-2.5 sm:py-1
                text-[10px] sm:text-xs font-medium
                ${getStatusClass(student.status)}
              `}
            >
              {getStatusIcon(student.status)}
              {student.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationCard;
