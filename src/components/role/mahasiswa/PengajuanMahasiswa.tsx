import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { ProgressSteps, NavigationButtons, STEPS } from "../../Step";
import {
  UploadPersyaratan,
  UploadPendaftaran,
  UploadPascaSeminar,
} from "../../modal/Upload";
import FileModal from "../../modal/File.Modal";
import {
  PendaftaranDiterima,
  PendaftaranDitolak,
  PendaftaranMenunggu,
} from "../../modal/StatusPendaftaran";
import { CardUpload } from "../../Card";
import { Button } from "flowbite-react";

// Types & Data
export interface DocumentData {
  name: string;
  status: "menunggu" | "diterima" | "revisi";
}

export interface SubmissionData {
  number: number;
  date: string;
  status: "revisi" | "diterima" | "menunggu";
  documents: DocumentData[];
}

// Dummy Data
const submission1: SubmissionData = {
  number: 1,
  date: "Senin, 4 November 2024",
  status: "revisi",
  documents: [
    { name: "Surat keterangan selesai KP dari instansi", status: "diterima" },
    { name: "Daily Report Kerja Praktik - Minggu 1", status: "diterima" },
    { name: "Daily Report Kerja Praktik - Minggu 2", status: "revisi" },
    { name: "Daily Report Kerja Praktik - Minggu 3", status: "revisi" },
    { name: "Daily Report Kerja Praktik - Minggu 4", status: "diterima" },
    { name: "Daily Report Kerja Praktik - Minggu 5", status: "diterima" },
    { name: "Laporan Akhir Kerja Praktik", status: "revisi" },
  ],
};

const submission2: SubmissionData = {
  number: 2,
  date: "Selasa, 5 November 2024",
  status: "diterima",
  documents: [
    { name: "Surat keterangan selesai KP dari instansi", status: "diterima" },
    { name: "Daily Report Kerja Praktik - Minggu 1", status: "diterima" },
    { name: "Daily Report Kerja Praktik - Minggu 2", status: "diterima" },
    { name: "Daily Report Kerja Praktik - Minggu 3", status: "diterima" },
    { name: "Daily Report Kerja Praktik - Minggu 4", status: "diterima" },
    { name: "Daily Report Kerja Praktik - Minggu 5", status: "diterima" },
    { name: "Laporan Akhir Kerja Praktik", status: "diterima" },
  ],
};

const submission3: SubmissionData = {
  number: 3,
  date: "Rabu, 6 November 2024",
  status: "menunggu",
  documents: [
    { name: "Surat keterangan selesai KP dari instansi", status: "menunggu" },
    { name: "Daily Report Kerja Praktik - Minggu 1", status: "menunggu" },
    { name: "Daily Report Kerja Praktik - Minggu 2", status: "menunggu" },
    { name: "Daily Report Kerja Praktik - Minggu 3", status: "menunggu" },
    { name: "Daily Report Kerja Praktik - Minggu 4", status: "menunggu" },
    { name: "Daily Report Kerja Praktik - Minggu 5", status: "menunggu" },
    { name: "Laporan Akhir Kerja Praktik", status: "menunggu" },
  ],
};

const SAMPLE_SUBMISSIONS = [submission1, submission2, submission3];

const Pengajuan: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeSubmission, setActiveSubmission] =
    useState<SubmissionData | null>(null);
  const [modalStates, setModalStates] = useState({
    upload: false,
    status: false,
    pendaftaranDitolak: false,
    pendaftaranDiterima: false,
    pendaftaranMenunggu: false,
  });

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };

  const closeModal = (modalKey: keyof typeof modalStates) => {
    setModalStates((prev) => ({ ...prev, [modalKey]: false }));
  };

  const handleStatusClick = (submission: SubmissionData) => {
    setActiveSubmission(submission);
    if (activeStep === 1) {
      switch (submission.status) {
        case "revisi":
          setModalStates((prev) => ({ ...prev, pendaftaranDitolak: true }));
          break;
        case "diterima":
          setModalStates((prev) => ({ ...prev, pendaftaranDiterima: true }));
          break;
        case "menunggu":
          setModalStates((prev) => ({ ...prev, pendaftaranMenunggu: true }));
          break;
      }
    } else {
      setModalStates((prev) => ({ ...prev, status: true }));
    }
  };

  const renderUploadModal = () => {
    if (!modalStates.upload) return null;

    const modalProps = {
      isOpen: modalStates.upload,
      onClose: () => closeModal("upload"),
    };

    switch (activeStep) {
      case 0:
        return <UploadPersyaratan {...modalProps} />;
      case 1:
        return <UploadPendaftaran {...modalProps} />;
      case 2:
        return <UploadPascaSeminar {...modalProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="container bg-white md:p-4 rounded-lg">
      <div className="mt-6">
        <ProgressSteps activeStep={activeStep} onStepClick={handleStepClick} />
      </div>

      <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
        <h3 className="md:text-lg text-base font-reguler text-gray-900">
          Riwayat Pengajuan{" "}
          <span className="font-bold">{STEPS[activeStep].title}</span> Seminar
          KP
        </h3>
        <Button
          onClick={() => setModalStates((prev) => ({ ...prev, upload: true }))}
          className="inline-flex items-center w-full md:w-fit mt-4 text-sm font-medium text-white bg-blue-700 border border-gray-300 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Buat
          <PlusCircle className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {SAMPLE_SUBMISSIONS.map((submission, index) => (
        <CardUpload
          key={index}
          {...submission}
          onStatusClick={() => handleStatusClick(submission)}
        />
      ))}

      {renderUploadModal()}

      {activeSubmission && (
        <FileModal
          title={`Pengajuan ${STEPS[activeStep].title} Seminar KP Anda`}
          status={activeSubmission.status}
          isOpen={modalStates.status}
          onClose={() => {
            closeModal("status");
            setActiveSubmission(null);
          }}
          documents={activeSubmission.documents}
        />
      )}

      <PendaftaranDitolak
        title={`Pengajuan ${STEPS[activeStep].title} Seminar KP Anda`}
        isOpen={modalStates.pendaftaranDitolak}
        onClose={() => closeModal("pendaftaranDitolak")}
      />

      <PendaftaranDiterima
        title={`Pengajuan ${STEPS[activeStep].title} Seminar KP Anda`}
        isOpen={modalStates.pendaftaranDiterima}
        onClose={() => closeModal("pendaftaranDiterima")}
      />

      <PendaftaranMenunggu
        title={`Pengajuan ${STEPS[activeStep].title} Seminar KP Anda`}
        isOpen={modalStates.pendaftaranMenunggu}
        onClose={() => closeModal("pendaftaranMenunggu")}
      />

      <NavigationButtons
        activeStep={activeStep}
        onPrevious={() => setActiveStep((prev) => Math.max(0, prev - 1))}
        onNext={() =>
          setActiveStep((prev) => Math.min(STEPS.length - 1, prev + 1))
        }
      />
    </div>
  );
};

export default Pengajuan;
