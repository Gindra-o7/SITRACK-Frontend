import React,{useState} from 'react';
import Upload from '../Upload.Form.jsx';
import {X} from 'lucide-react';
import Confirm from './Confirm.jsx';

const UploadPascaSeminar = ({ isOpen, onClose }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const documents = [
        {
            title: "Surat Undangan Seminar Hasil KP",
            text: "Scan lembar pernyataan telah selesai melaksanakan KP, dapat di download pada link: https://s.id/pernyataan-selesai-kp"
        },
        {
            title: "Berita Acara Seminar",
            text: "Lembar Pernyataan Telah Selesai Melaksanakan KP yang sudah ditanda tangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP."
        },
        {
            title: "Daftar Hadir Seminar",
            text: "Daily Report yang sudah ditanda tangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP."
        },
        {
            title: "Lembar Pengesahan KP",
            text: "Laporan Tambahan tugas KP final yang sudah disetujui oleh dosen pembimbing KP."
        }
    ];
    const handleSubmit = () => {
        setShowConfirmation(true);
    };

    const handleConfirm = () => {
        // Handle the actual submission here
        setShowConfirmation(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Validasi Diseminasi Kerja Praktik
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
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Progress File • 7 of 7
                        </p>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleSubmit}
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            Kirim
                        </button>
                    </div>
                </div>
            </div>
            <Confirm
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

export default UploadPascaSeminar;