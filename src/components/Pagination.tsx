import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
}: PaginationProps) => {
  // Check if pagination should be disabled
  const isPaginationDisabled = totalItems <= itemsPerPage;

  // Calculate the actual number of pages needed
  const displayedPages = isPaginationDisabled ? 1 : totalPages;

  return (
    <div className="md:mt-5 mt-6 flex md:justify-between items-center md:flex-row flex-col gap-4">
      <div className="text-xs md:text-sm text-gray-700 font-normal">
        Menampilkan{" "}
        <span className="text-blue-700 font-bold">
          {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
        </span>{" "}
        -{" "}
        <span className="text-blue-700 font-bold">
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{" "}
        dari <span className="text-blue-700 font-bold">{totalItems}</span> data
      </div>

      <div className="flex space-x-2 md:text-base text-xs">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1 || isPaginationDisabled}
          className="px-3 py-1 border bg-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft />
        </button>

        {[...Array(displayedPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            disabled={isPaginationDisabled}
            className={`px-3 py-1 border rounded-md ${
              currentPage === i + 1 ? "bg-blue-700 text-white" : ""
            } ${isPaginationDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || isPaginationDisabled}
          className="px-3 py-1 border bg-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
