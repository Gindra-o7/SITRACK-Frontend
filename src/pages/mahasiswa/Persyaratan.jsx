import { useState } from 'react';
import CardUpload from "../../components/Card.Upload.jsx";
import { CirclePlus } from "lucide-react";
import UploadPersyaratan from "../../components/Modal/Upload.Persyaratan.jsx";
import Revisi from "../../components/Modal/Revisi.jsx";
import Diterima from "../../components/Modal/Diterima.jsx";

const Persyaratan = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
    const [revisionNotes, setRevisionNotes] = useState([]);

    const submissions = [
        { number: 1, date: "Senin, 4 November 2024", status: "revisi", notes: [
                "Surat keterangan selesai kp dari instansi",
                "Daily Report Kerja Praktik 1",
                "Daily Report Kerja Praktik 2",
            ] },
        { number: 2, date: "Selasa, 5 November 2024", status: "diterima" },
        { number: 3, date: "Rabu, 6 November 2024", status: "menunggu" },
    ];

    const handleStatusClick = (status, notes) => {
        if (status === "revisi") {
            setRevisionNotes(notes);
            setIsRevisionModalOpen(true);
        } else if (status === "diterima") {
            setIsAcceptModalOpen(true);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-reguler text-gray-900 dark:text-white">
                    Riwayat Pengajuan <span className="font-bold">Persyaratan</span> Seminar KP
                </h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                    Create
                    <CirclePlus className="w-6 h-6 ml-2"/>
                </button>
            </div>

            {/* Submission Cards */}
            {submissions.map((submission, index) => (
                <CardUpload
                    key={index}
                    number={submission.number}
                    date={submission.date}
                    status={submission.status}
                    onStatusClick={() => handleStatusClick(submission.status, submission.notes)}
                />
            ))}

            {/* Upload Modal */}
            <UploadPersyaratan
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {/* Revision Modal */}
            <Revisi
                title="Pengajuan Persyaratan Seminar Kp Anda"
                text="Laporan Daily report tidak ada tanda tangan pembimbing instansi, serta, surat keterangan selesai kp tidak di tandatangan basah oleh dosen pembimbing."
                isOpen={isRevisionModalOpen}
                onClose={() => setIsRevisionModalOpen(false)}
                notes={revisionNotes}
            />

            <Diterima
                title="Pengajuan Persyaratan Seminar Kp Anda"
                text="Silakan lalukan pendaftaran deseminasi kp !"
                textButton="Lanjut Pendaftaran"
                isOpen={isAcceptModalOpen}
                onClose={() => setIsAcceptModalOpen(false)}
                linkTo="/mahasiswa/pendaftaran"
            />
        </div>
    );
}

export default Persyaratan;