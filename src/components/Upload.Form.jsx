import { useState, useRef } from "react";
import { FileText } from "lucide-react";
import Button from "./Button";

const UploadForm = ({ title, text }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setIsDragOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    setFile(event.dataTransfer.files[0]);
  };

  const handleUpload = () => {
    // Simulating the upload process
    let uploadProgress = 0;
    const interval = setInterval(() => {
      uploadProgress += 5;
      setProgress(uploadProgress);
      if (uploadProgress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  const handleDropZoneClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">{title}</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-1/2 flex items-center justify-center px-6 pt-5 pb-6 border-2 rounded-md cursor-pointer ${
            isDragOver
              ? "border-primary bg-gray-100"
              : "border-gray-300 border-dashed"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleDropZoneClick}
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
            />
          </div>
        </div>
        <div className="w-1/2 pr-4 mx-4">
          <p className="block text-gray-700 font-medium mb-2">{text}</p>
        </div>
      </div>

      {/* Progress Section */}
      {file && (
        <div className="mb-4 w-1/3">
          <p className="text-gray-700 font-medium mb-2">
            Uploading: {file.name}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Buttons Section */}
      <div className="flex justify-end w-1/4 space-x-4">
        <Button variant="cancel" onClick={() => {}}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpload}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default UploadForm;
