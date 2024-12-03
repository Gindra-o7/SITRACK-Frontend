import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface ValidationModalProps {
  activeDocument: {
    id: number;
    name: string;
  };
  selectedStudent: {
    id: number;
    name: string;
  };
  comments: Record<string, string>;
  statuses: Record<string, string>; // New: To store previously selected statuses
  onClose: () => void;
  onValidate: (docId: number, status: string) => void;
  onCommentSubmit: (studentId: number, docId: number, comment: string) => void;
}

const ValidationModal: React.FC<ValidationModalProps> = ({
  activeDocument,
  selectedStudent,
  comments,
  statuses, // New: Pass the saved statuses
  onClose,
  onValidate,
  onCommentSubmit,
}) => {
  const [comment, setComment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    // Pre-fill comment and status when modal opens
    const previousComment =
      comments[`${selectedStudent.id}-${activeDocument.id}`] || "";
    const previousStatus =
      statuses[`${selectedStudent.id}-${activeDocument.id}`] || null;
    setComment(previousComment);
    setSelectedStatus(previousStatus);
  }, [selectedStudent.id, activeDocument.id, comments, statuses]);

  const handleValidationClick = (status: string) => {
    // Toggle status if clicked twice
    if (selectedStatus === status) {
      setSelectedStatus(null);
      onValidate(activeDocument.id, "");
    } else {
      setSelectedStatus(status);
      onValidate(activeDocument.id, status);
      if (status === "setuju") {
        setComment(""); // Clear comment if status is "setuju"
      }
    }
  };

  useEffect(() => {
    const previousStatus =
      statuses[`${selectedStudent.id}-${activeDocument.id}`] || null;
    setSelectedStatus(previousStatus);
  }, [selectedStudent.id, activeDocument.id, statuses]);

  const handleCommentSubmit = () => {
    if (selectedStatus === "revisi" && !comment.trim()) {
      return; // Prevent submission if no comment is provided for "revisi"
    }
    onCommentSubmit(selectedStudent.id, activeDocument.id, comment);
    onClose(); // Close the modal after submission
  };

  const isSaveEnabled =
    selectedStatus &&
    (selectedStatus === "setuju" ||
      (selectedStatus === "revisi" && comment.trim()));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">
          Validasi Dokumen: {activeDocument.name}
        </h3>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <button
              className={`flex-1 px-3 py-2 border rounded-md flex items-center justify-center transition-colors 
                ${
                  selectedStatus === "setuju"
                    ? "bg-green-100 border-green-500"
                    : "hover:bg-gray-50"
                }`}
              onClick={() => handleValidationClick("setuju")}
            >
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Setuju
            </button>
            <button
              className={`flex-1 px-3 py-2 border rounded-md flex items-center justify-center transition-colors
                ${
                  selectedStatus === "revisi"
                    ? "bg-red-100 border-red-500"
                    : "hover:bg-gray-50"
                }`}
              onClick={() => handleValidationClick("revisi")}
            >
              <XCircle className="w-4 h-4 mr-2 text-red-500" />
              Revisi
            </button>
          </div>

          {/* Conditional rendering of comment textarea */}
          {selectedStatus === "revisi" && (
            <div>
              <label className="text-sm font-medium">Komentar:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tambahkan komentar untuk mahasiswa..."
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
          )}

          <button
            className={`w-full py-2 ${
              isSaveEnabled
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-600"
            } rounded-md hover:${
              isSaveEnabled ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={handleCommentSubmit}
            disabled={!isSaveEnabled} // Disable if no status or comment for "revisi"
          >
            Simpan {selectedStatus === "revisi" ? "Komentar" : "Validasi"}
          </button>
          <button
            className="w-full py-2 border rounded-md hover:bg-gray-50"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;
