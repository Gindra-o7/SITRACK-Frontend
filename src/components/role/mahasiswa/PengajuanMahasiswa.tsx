import React, {useEffect, useState} from "react";
import { PlusCircle } from "lucide-react";
import { ProgressSteps, NavigationButtons, STEPS } from "../../Step";
import {
  UploadPersyaratan,
  UploadPendaftaran,
  UploadPascaSeminar,
} from "../../modal/Upload";
import FileModal from "../../modal/File.Modal";
import { CardUpload } from "../../Card";
import axiosInstance from "../../../configs/axios.configs.ts";
import {UserData, GroupedDocuments} from "../../../interfaces/common.interfaces.ts"

export interface DocumentData {
  name: string;
  status: "submitted" | "verified" | "rejected";
}

export interface SubmissionData {
  number: number;
  date: string;
  status: "submitted" | "verified" | "rejected";
  documents: DocumentData[];
}

const Pengajuan: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeSubmission, setActiveSubmission] = useState<GroupedDocuments | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [documents, setDocuments] = useState<GroupedDocuments[]>([]);
  const [modalStates, setModalStates] = useState({
    upload: false,
    status: false
  });

  const mapStatus = (status: string): "submitted" | "verified" | "rejected" => {
    switch (status) {
      case 'verified': return 'verified';
      case 'rejected': return 'rejected';
      default: return 'submitted';
    }
  };

  const groupDocuments = (groups: any[]): GroupedDocuments[] => {
    return groups.map((group, index) => ({
      number: index + 1,
      date: group.date,
      status: group.status,
      documents: group.documents.map((doc: any) => ({
        name: doc.jenisDokumen,
        status: mapStatus(doc.status),
        filePath: doc.filePath
      }))
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/mahasiswa/me');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!userData?.mahasiswa.nim) return;

      try {
        const kategori = STEPS[activeStep].title.toUpperCase();
        const response = await axiosInstance.get(
            `/mahasiswa/history/${kategori}/${userData.mahasiswa.nim}`
        );
        const groupedDocs = groupDocuments(response.data);
        setDocuments(groupedDocs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    if (userData) {
      fetchDocuments();
    }
  }, [userData, activeStep]);

  const handleStepClick = (stepIndex: number) => setActiveStep(stepIndex);
  const closeModal = (modalKey: keyof typeof modalStates) => {
    setModalStates(prev => ({ ...prev, [modalKey]: false }));
  };

  const handleStatusClick = (submission: SubmissionData) => {
    setActiveSubmission(submission);
    setModalStates(prev => ({ ...prev, status: true }));
  };

  const handleDocumentClick = (filePath: string) => {
    window.open(`http://localhost:5000/${filePath}`, '_blank');
  };

  const renderUploadModal = () => {
    if (!modalStates.upload || !userData) return null;

    const modalProps = {
      isOpen: modalStates.upload,
      onClose: () => closeModal("upload"),
      nim: userData.mahasiswa.nim,
      userId: userData.id,
      onUploadSuccess: () => {
        closeModal("upload");
        const fetchDocuments = async () => {
          if (!userData?.mahasiswa.nim) return;
          try {
            const kategori = STEPS[activeStep].title.toUpperCase();
            const response = await axiosInstance.get(
                `/mahasiswa/history/${kategori}/${userData.mahasiswa.nim}`
            );
            const groupedDocs = groupDocuments(response.data);
            setDocuments(groupedDocs);
          } catch (error) {
            console.error('Error fetching documents:', error);
          }
        };
        fetchDocuments();
      }
    };

    const components = {
      0: UploadPersyaratan,
      1: UploadPendaftaran,
      2: UploadPascaSeminar
    };

    const ModalComponent = components[activeStep as keyof typeof components];
    return ModalComponent ? <ModalComponent {...modalProps} /> : null;
  };

  if (!userData) return <div>Loading...</div>;

  return (
      <div className="container bg-white p-4 rounded-lg">
        <div className="mt-6">
          <ProgressSteps activeStep={activeStep} onStepClick={handleStepClick}/>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-reguler text-gray-900">
            Riwayat Pengajuan{" "}
            <span className="font-bold">{STEPS[activeStep].title}</span> Seminar
            KP
          </h3>
          <button
              onClick={() => setModalStates((prev) => ({...prev, upload: true}))}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Buat
            <PlusCircle className="w-5 h-5 ml-2"/>
          </button>
        </div>

        {documents.map((submission, index) => (
            <CardUpload
                key={index}
                {...submission}
                onStatusClick={() => handleStatusClick(submission)}
                onDocumentClick={handleDocumentClick}
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
                onDocumentClick={handleDocumentClick}
            />
        )}

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