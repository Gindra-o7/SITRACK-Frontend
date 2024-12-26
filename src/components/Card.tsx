import React from "react";
import {
  ChevronRight,
  LucideIcon,
  FileCheck,
  FileClock,
  FileX,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

export interface CardData {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
}

export const Card: React.FC<CardData> = ({
  title,
  description,
  path,
  icon: Icon,
}) => {
  return (
    <a
      href={path}
      className="block bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] hover:border-blue-600"
    >
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex items-center justify-center p-3 bg-blue-50 rounded-full transition-colors duration-300 hover:bg-blue-100 group">
          <Icon className="w-6 h-6 text-black transition-transform duration-300 group-hover:scale-110" />
        </div>
        <h3 className="font-bold">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="flex items-center gap-1 text-black-400 font-bold">
        Details
        <ChevronRight className="w-4 h-4" />
      </div>
    </a>
  );
};

interface BaseProps {
  value: string;
}

interface BasicStat extends BaseProps {
  variant: "basic";
  label: string;
}

interface DetailedStat extends BaseProps {
  variant: "detailed";
  title: string;
  description: string;
}

type StatProps = BasicStat | DetailedStat;

export const CardStat: React.FC<StatProps> = (props) => {
  if (props.variant === "basic") {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <div className="text-3xl font-bold text-blue-600">{props.value}</div>
        <div className="text-sm text-gray-600">{props.label}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="text-base font-semibold text-gray-800">{props.title}</div>
      <div className="text-3xl font-bold text-blue-600 mt-1">{props.value}</div>
      <div className="text-sm text-gray-500 mt-2">{props.description}</div>
    </div>
  );
};

type StatusType = "revisi" | "diterima" | "menunggu";

interface CardUploadProps {
  number: string | number;
  date: string;
  status: StatusType;
  onStatusClick: () => void;
}

export const CardUpload: React.FC<CardUploadProps> = ({
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
          <h5 className="md:text-2xl text-xxl font-semibold tracking-tight text-gray-900 mt-4 ">
            Pengajuan #{number}
          </h5>
        </div>
        <div className="text-left sm:mt-0 sm:text-right">
          <p className="font-semibold text-gray-600 mb-1  sm:mb-2 md:text-base text-sm">
            {date}
          </p>
          <button
            onClick={onStatusClick}
            className="inline-flex items-center px-3 py-2 md:text-sm text-xs font-medium rounded-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 mt-4"
          >
            View
            <ChevronRight className="w-4 h-4 ms-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

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

export const StudentCard: React.FC<StudentCardProps> = ({
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

export type StudentValidation = {
  name: string;
  nim: string;
  documentStatus: string;
  submissionDate: string;
  status: string;
};

type ValidationCardProps = {
  student: StudentValidation;
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

export const ValidationCard: React.FC<ValidationCardProps> = ({
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
        md:p-5 sm:p-4 p-5
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
