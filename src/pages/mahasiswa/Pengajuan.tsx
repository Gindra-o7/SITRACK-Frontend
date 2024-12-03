import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { ProgressSteps, NavigationButtons, STEPS } from "../../components/Step";
import UploadPersyaratan from "../../components/Modal/Upload.Persyaratan";
import UploadPendaftaran from "../../components/Modal/Upload.Pendaftaran";
import UploadPascaSeminar from "../../components/Modal/Upload.PascaSeminar";
import FileModal from "../../components/Modal/File.Modal";
import PendaftaranDitolak from "../../components/Modal/Pendaftaran.Ditolak";
import PendaftaranDiterima from "../../components/Modal/Pendaftaran.Diterima";
import PendaftaranMenunggu from "../../components/Modal/Pendaftaran.Menunggu";
import CardUpload from "../../components/Card.Upload";

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
    <div className="container bg-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Pengajuan</h1>

      <ProgressSteps activeStep={activeStep} onStepClick={handleStepClick} />

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-reguler text-gray-900">
          Riwayat Pengajuan{" "}
          <span className="font-bold">{STEPS[activeStep].title}</span> Seminar
          KP
        </h3>
        <button
          onClick={() => setModalStates((prev) => ({ ...prev, upload: true }))}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Buat
          <PlusCircle className="w-5 h-5 ml-2" />
        </button>
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
