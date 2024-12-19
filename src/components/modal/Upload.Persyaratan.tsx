import React, { useState } from "react";
import Upload from '../Upload.Form';
import { X } from 'lucide-react';
import ModalConfirm from './Confirm';

interface UploadPersyaratanProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Document {
    title: string;
    text: string;
}

const UploadPersyaratan = ({ isOpen, onClose }: UploadPersyaratanProps): JSX.Element | null => {
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

    const documents: Document[] = [
        {
            title: "Surat Keterangan Selesai KP dari Instansi",
            text: "Lembar pernyataan sudah ditandatangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP. Link template: https://s.id/pernyataan-selesai-kp"
        },
        {
            title: "Lembar Pernyataan Telah Selesai",
            text: "Lembar Pernyataan Telah Selesai Melaksanakan KP yang sudah ditanda tangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP."
        },
        {
            title: "Daily Report",
            text: "Daily Report yang sudah ditanda tangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP."
        },
        {
            title: "Laporan Tambahan Tugas KP",
            text: "Laporan Tambahan tugas KP final yang sudah disetujui oleh dosen pembimbing KP."
        },
        {
            title: "Surat Bimbingan Dosen Pembimbing",
            text: "Sudah melakukan minimal lima kali bimbingan kepada dosen pembimbing selama melaksanakan kegiatan KP."
        },
        {
            title: "Setoran Hafalan Surat 1 - 16 Pada Juz",
            text: "Sudah memenuhi setoran hafalan surat 1 - 16 pada juz 30 sesuai Form Setoran Hafalan kepada Dosen Pembimbing Akademik."
        },
        {
            title: "Form Kehadiran Pada Seminar KP",
            text: "Telah menghadiri Seminar KP mahasiswa lain minimal lima kali seminar yang dibuktikan dengan Form Kehadiran Pada Seminar KP."
        }
    ];

    const handleSubmit = (): void => {
        setShowConfirmation(true);
    };

    const handleConfirm = (): void => {
        // Handle the actual submission here
        setShowConfirmation(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
            <div
                className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
                <div
                    className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700"
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Upload Dokumen Persyaratan
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <X className="w-6 h-6"/>
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {documents.map((doc, index) => (
                        <Upload
                            key={index}
                            title={doc.title}
                            text={doc.text}
                        />
                    ))}

                    <div className="mt-4">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: '50%' }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Progress File • 7 of 7
                        </p>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleSubmit}
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            Kirim
                        </button>
                    </div>
                </div>
            </div>

            <ModalConfirm
                text="Anda yakin akan melakukan pengiriman"
                confirm="Yakin"
                cancel="Tidak"
                isOpen={showConfirmation}
                onConfirm={handleConfirm}
                onCancel={() => setShowConfirmation(false)}
            />
        </div>
    );
};

export default UploadPersyaratan;