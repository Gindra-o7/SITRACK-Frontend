import React, { useState } from "react";
import UploadPersyaratan from "../../components/Modal/Upload.Persyaratan.jsx";
import UploadPendaftaran from "../../components/Modal/Upload.Pendaftaran.jsx";
import UploadPascaSeminar from "../../components/Modal/Upload.PascaSeminar.jsx";
import Revisi from "../../components/Modal/Revisi.jsx";
import Diterima from "../../components/Modal/Diterima.jsx";
import PendaftaranDiterima from "../../components/Modal/Diterima.jsx";
import CardUpload from "../../components/Card.Upload.jsx";
import { CheckCircle, PlusCircle } from "lucide-react";

const Pengajuan = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isPendaftaranDitolakModalOpen, setIsPendaftaranDitolakModalOpen] =
      useState(false);
  const [isPendaftaranDiterimaModalOpen, setIsPendaftaranDiterimaModalOpen] =
      useState(false);
  const [revisionNotes, setRevisionNotes] = useState([]);

  const submissions = [
    {
      number: 1,
      date: "Senin, 4 November 2024",
      status: "revisi",
      notes: [
        "Surat keterangan selesai kp dari instansi",
        "Daily Report Kerja Praktik 1",
        "Daily Report Kerja Praktik 2",
      ],
    },
    { number: 2, date: "Selasa, 5 November 2024", status: "diterima" },
    { number: 3, date: "Rabu, 6 November 2024", status: "menunggu" },
  ];

  const handleStatusClick = (status, notes) => {
    if (activeStep === 1) {
      if (status === "revisi") {
        setIsPendaftaranDitolakModalOpen(true);
      } else if (status === "diterima") {
        setIsPendaftaranDiterimaModalOpen(true);
      }
    } else {
      if (status === "revisi") {
        setRevisionNotes(notes);
        setIsRevisionModalOpen(true);
      } else if (status === "diterima") {
        setIsAcceptModalOpen(true);
      }
    }
  };

  const steps = [
    {
      id: 0,
      title: "Persyaratan",
      description: "Syarat-syarat untuk mendaftar seminar",
    },
    {
      id: 1,
      title: "Pendaftaran",
      description: "Berkas-berkas pendaftaran seminar",
    },
    {
      id: 2,
      title: "Pasca-Seminar",
      description: "Berkas setelah pelaksanaan seminar",
    },
  ];

  const getStepTitle = () => {
    return steps[activeStep].title;
  };

  const renderModal = () => {
    if (!isModalOpen) return null;

    switch (activeStep) {
      case 0:
        return (
            <UploadPersyaratan
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        );
      case 1:
        return (
            <UploadPendaftaran
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        );
      case 2:
        return (
            <UploadPascaSeminar
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        );
      default:
        return null;
    }
  };

  return (
      <div className="container">
        <h1 className="text-2xl font-bold mb-6">Pengajuan</h1>

        {/* Improved Progress Steps */}
        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center relative w-1/3">
                  <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 z-10 relative 
                ${
                          activeStep === index
                              ? "bg-blue-500 text-white"
                              : activeStep > index
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-200"
                      }`}
                  >
                    {activeStep > index ? (
                        <CheckCircle className="w-5 h-5" />
                    ) : (
                        index + 1
                    )}
                  </div>
                  <div className="text-sm font-medium text-center">
                    {step.title}
                  </div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                      <div
                          className={`absolute top-4 -right-1/2 w-full h-1 
                  ${activeStep > index ? "bg-green-500" : "bg-gray-200"}`}
                          style={{
                            right: "-50%",
                            width: "100%",
                          }}
                      ></div>
                  )}
                </div>
              </React.Fragment>
          ))}
        </div>

        {/* Rest of the component remains the same */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-reguler text-gray-900">
            Riwayat Pengajuan <span className="font-bold">{getStepTitle()}</span>{" "}
            Seminar KP
          </h3>
          <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Create
            <PlusCircle className="w-6 h-6 ml-2" />
          </button>
        </div>

        {submissions.map((submission, index) => (
            <CardUpload
                key={index}
                number={submission.number}
                date={submission.date}
                status={submission.status}
                onStatusClick={() =>
                    handleStatusClick(submission.status, submission.notes)
                }
            />
        ))}

        {renderModal()}

        {/* Other modal components remain the same */}
        <Revisi
            title={`Pengajuan ${getStepTitle()} Seminar KP Anda`}
            text="Laporan Daily report tidak ada tanda tangan pembimbing instansi, serta, surat keterangan selesai kp tidak di tandatangan basah oleh dosen pembimbing."
            isOpen={isRevisionModalOpen}
            onClose={() => setIsRevisionModalOpen(false)}
            notes={revisionNotes}
        />

        <Diterima
            title={`Pengajuan ${getStepTitle()} Seminar KP Anda`}
            isOpen={isAcceptModalOpen}
            onClose={() => setIsAcceptModalOpen(false)}
        />

        <PendaftaranDitolak
            title={`Pengajuan ${getStepTitle()} Seminar KP Anda`}
            isOpen={isPendaftaranDitolakModalOpen}
            onClose={() => setIsPendaftaranDitolakModalOpen(false)}
        />

        <PendaftaranDiterima
            title={`Pengajuan ${getStepTitle()} Seminar KP Anda`}
            isOpen={isPendaftaranDiterimaModalOpen}
            onClose={() => setIsPendaftaranDiterimaModalOpen(false)}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
              className={`px-4 py-2 border rounded-md ${
                  activeStep === 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-50"
              }`}
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
          >
            Previous
          </button>
          <button
              className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                  activeStep === steps.length - 1
                      ? "bg-gray-400 cursor-not-allowed"
                      : "hover:bg-blue-600"
              }`}
              onClick={() =>
                  setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))
              }
              disabled={activeStep === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
  );
};

export default Pengajuan;