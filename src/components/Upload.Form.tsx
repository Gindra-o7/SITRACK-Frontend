import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { FileText } from "lucide-react";
import Button from "./Button";

interface UploadFormProps {
  title: string;
  text: string;
}

interface FileWithProgress extends File {
  progress?: number;
}

const UploadForm: React.FC<UploadFormProps> = ({ title, text }) => {
  const [file, setFile] = useState<FileWithProgress | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsDragOver(false);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleUpload = (): void => {
    let uploadProgress = 0;
    const interval = setInterval(() => {
      uploadProgress += 5;
      setProgress(uploadProgress);
      if (uploadProgress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  const handleDropZoneClick = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">{title}</h2>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Drag and Drop + Description Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-4">
        {/* Drag-and-Drop Section */}
        <div
          className={`w-full sm:w-1/2 flex items-center justify-center px-6 pt-5 pb-6 border-2 rounded-md cursor-pointer ${
            isDragOver
              ? "border-primary bg-gray-100"
              : "border-gray-300 border-dashed"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleDropZoneClick}
          role="button"
          tabIndex={0}
          aria-label="Upload file dropzone"
        >
          <div className="text-center">
            <i className="fas fa-cloud-upload-alt text-gray-400 text-4xl"></i>
            <div className="flex justify-center items-center">
              <FileText className="text-gray-400 text-4xl my-5" />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {isDragOver
                ? "Drop to upload"
                : "Click to upload or drag and drop a file"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              PDF, DOC, DOCX (Max 5MB)
            </p>
            <input
              ref={fileInputRef}
              id="file"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              aria-label="File input"
            />
          </div>
        </div>

        {/* Description Section */}
        <div className="w-full sm:w-1/2 mt-4 sm:mt-0 sm:ml-4">
          <p className="text-gray-700 font-medium">{text}</p>
        </div>
      </div>

      {/* Progress Section */}
      {file && (
        <div className="mb-4 w-full">
          <p className="text-gray-700 font-medium mb-2">
            Uploading: {file.name}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
      )}

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row sm:justify-end items-center w-full mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          variant="cancel"
          onClick={() => {}}
          className="w-full sm:w-auto px-4 py-2"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleUpload}
          disabled={!file}
          className="w-full sm:w-auto px-4 py-2"
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default UploadForm;
