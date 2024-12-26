import React from "react";
import { Check } from "lucide-react";
import { Button } from "flowbite-react";

interface Step {
  id: number;
  title: string;
}

export const STEPS: Step[] = [
  { id: 0, title: "Persyaratan" },
  { id: 1, title: "Pendaftaran" },
  { id: 2, title: "Pasca-Seminar" },
];

interface ProgressStepsProps {
  activeStep: number;
  onStepClick: (step: number) => void;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  activeStep,
  onStepClick,
}) => (
  <div className="flex justify-between items-center mb-8">
    {STEPS.map((step, index) => (
      <React.Fragment key={step.id}>
        <div className="flex flex-col items-center relative w-1/3">
          <button
            onClick={() => onStepClick(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 z-10 relative 
              ${
                activeStep === index
                  ? "bg-blue-700 text-white"
                  : activeStep > index
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              } 
              transform transition-all duration-200 hover:scale-110
              ${
                activeStep === index
                  ? "hover:bg-blue-800"
                  : activeStep > index
                  ? "hover:bg-green-600"
                  : "hover:bg-gray-300"
              }
              cursor-pointer`}
          >
            {activeStep > index ? <Check className="w-5 h-5" /> : index + 1}
          </button>
          <div
            onClick={() => onStepClick(index)}
            className="text-sm font-medium text-center cursor-pointer transition-all duration-200 hover:text-blue-600 hover:scale-105"
          >
            {step.title}
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={`absolute top-4 -right-1/2 w-full h-1 
                ${activeStep > index ? "bg-green-500" : "bg-gray-200"}`}
              style={{ right: "-50%", width: "100%" }}
            />
          )}
        </div>
      </React.Fragment>
    ))}
  </div>
);

interface NavigationButtonsProps {
  activeStep: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  activeStep,
  onPrevious,
  onNext,
}) => (
  <div className="flex justify-between mt-6">
    <Button
      className={`px-4 bg-white border rounded-md border-gray-200 transition-all duration-200
        ${
          activeStep === 0
            ? "text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-50 text-gray-600 hover:scale-105 bg-white "
        }`}
      onClick={onPrevious}
      disabled={activeStep === 0}
    >
      Sebelumnya
    </Button>
    <Button
      className={`px-4 rounded-md transition-all duration-200
        ${
          activeStep === STEPS.length - 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-700 text-white hover:bg-blue-900 hover:scale-105"
        }`}
      onClick={onNext}
      disabled={activeStep === STEPS.length - 1}
    >
      Lanjut
    </Button>
  </div>
);
