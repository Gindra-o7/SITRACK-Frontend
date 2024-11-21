import React, { useState } from "react";
import { File, ChevronDown } from "lucide-react";

const FileAccordionItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full">
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="text-gray-600">
              <File className="w-5 h-5" />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-200">
              {item}
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 text-gray-600 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-white border-x border-b rounded-b-lg dark:bg-gray-800 dark:border-gray-700">
          <h4 className="font-medium text-sm mb-2 dark:text-white">Catatan:</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileAccordionItem;
