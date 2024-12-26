import React, {useState, FormEvent, ChangeEvent} from "react";
import Upload from "../Upload.Form";
import {X} from "lucide-react";
import ModalConfirm from "./Confirm";
import axiosInstance from "../../configs/axios.configs.ts";
import { UploadPersyaratanProps, DocumentUpload, UploadPendaftaranProps, FormDataType, DocumentPendaftaran } from "../../interfaces/common.interfaces.ts";

export const UploadPersyaratan = ({
                                      isOpen,
                                      onClose,
                                      nim,
                                      userId
                                  }: UploadPersyaratanProps): JSX.Element | null => {
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string>("");
    const [documents, setDocuments] = useState<DocumentUpload[]>([
        {
            title: "Surat Keterangan Selesai KP dari Instansi",
            text: "Lembar pernyataan sudah ditandatangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP. Link template: https://s.id/pernyataan-selesai-kp",
            jenisDokumen: "SURAT_KETERANGAN_SELESAI_KP",
            file: null
        },
        {
            title: "Lembar Pernyataan Telah Selesai KP",
            text: "Lembar Pernyataan Telah Selesai Melaksanakan KP yang sudah ditanda tangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP.",
            jenisDokumen: "LEMBAR_PERNYATAAN_SELESAI_KP",
            file: null
        },
        {
            title: "Daily Report",
            text: "Daily Report yang sudah ditanda tangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP.",
            jenisDokumen: "DAILY_REPORT",
            file: null
        },
        {
            title: "Laporan Tambahan Tugas KP",
            text: "Laporan Tambahan tugas KP final yang sudah disetujui oleh dosen pembimbing KP.",
            jenisDokumen: "LAPORAN_TAMBAHAN_KP",
            file: null
        },
        {
            title: "Surat Bimbingan Dosen Pembimbing",
            text: "Sudah melakukan minimal lima kali bimbingan kepada dosen pembimbing selama melaksanakan kegiatan KP.",
            jenisDokumen: "SURAT_BIMBINGAN_DOSEN",
            file: null
        },
        {
            title: "Setoran Hafalan Surat 1 - 16 Pada Juz",
            text: "Sudah memenuhi setoran hafalan surat 1 - 16 pada juz 30 sesuai Form Setoran Hafalan kepada Dosen Pembimbing Akademik.",
            jenisDokumen: "SETORAN_HAFALAN",
            file: null
        },
        {
            title: "Form Kehadiran Pada Seminar KP",
            text: "Telah menghadiri Seminar KP mahasiswa lain minimal lima kali seminar yang dibuktikan dengan Form Kehadiran Pada Seminar KP.",
            jenisDokumen: "FORM_KEHADIRAN_SEMINAR",
            file: null
        },
    ]);

    const handleFileChange = (index: number, file: File) => {
        setDocuments(prev => {
            const updated = [...prev];
            updated[index].file = file;
            return updated;
        });
    };

    const uploadDocument = async (doc: DocumentUpload) => {
        if (!doc.file) return;

        if (!nim || !userId) {
            console.error('Missing required props:', {nim, userId});
            throw new Error('NIM and UserID are required');
        }

        const formData = new FormData();
        formData.append('file', doc.file);
        formData.append('nim', String(nim));
        formData.append('userId', String(userId));
        formData.append('jenisDokumen', doc.jenisDokumen);
        formData.append('kategori', 'PERSYARATAN');

        // Debug formData
        console.log('FormData contents:');
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            const response = await axiosInstance.post('/mahasiswa/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Upload response:', response.data);

            if (!response.data) {
                throw new Error('No response data received');
            }

            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const handleConfirm = async () => {
        setIsUploading(true);
        setUploadError("");

        try {
            const uploadPromises = documents
                .filter(doc => doc.file)
                .map(doc => uploadDocument(doc));

            await Promise.all(uploadPromises);

            // Success handling
            setTimeout(() => {
                setShowConfirmation(false);
                onClose();
            }, 2000);
        } catch (error: any) {
            console.error('Error uploading documents:', error);
            setUploadError(error.response?.data?.message || 'Error uploading documents');
        } finally {
            setIsUploading(false);
        }
    };


    const completedUploads = documents.filter(doc => doc.file).length;
    const progress = (completedUploads / documents.length) * 100;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
            <div
                className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div
                    className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700">
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

                {/* Content */}
                <div className="p-6">
                    {uploadError && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            {uploadError}
                        </div>
                    )}
                    {documents.map((doc, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="font-medium mb-2">{doc.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {doc.text}
                            </p>
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFileChange(index, file);
                                }}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                            />
                        </div>
                    ))}

                    {/* Progress bar */}
                    <div className="mt-4">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{width: `${progress}%`}}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Progress File • {completedUploads} of {documents.length}
                        </p>
                    </div>

                    {/* Submit button */}
                    <div className="mt-6">
                        <button
                            onClick={() => setShowConfirmation(true)}
                            disabled={isUploading}
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-blue-400"
                        >
                            {isUploading ? 'Mengunggah...' : 'Kirim'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
                        <p className="mb-4">Anda yakin akan melakukan pengiriman?</p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                disabled={isUploading}
                                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:bg-gray-300"
                            >
                                Tidak
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={isUploading}
                                className="px-4 py-2 text-sm text-white bg-blue-700 rounded-lg hover:bg-blue-800 disabled:bg-blue-400"
                            >
                                {isUploading ? 'Mengunggah...' : 'Yakin'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const UploadPendaftaran: React.FC<UploadPendaftaranProps> = ({
                                                                        isOpen,
                                                                        onClose,
                                                                        nim,
                                                                        userId
                                                                    }) => {
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string>("");
    const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});

    const [formData, setFormData] = useState<FormDataType>({
        nim: "",
        judulLaporan: "",
        namaInstansi: "",
        alamatInstansi: "",
        mulaiKp: "",
        selesaiKp: "",
        namaPembimbingInstansi: "",
        jabatanPembimbingInstansi: "",
        noTeleponPembimbing: "",
        emailPembimbingInstansi: "",
    });

    const documents: DocumentPendaftaran[] = [
        {
            title: "Lembar form bimbingan KP",
            text: "Minimal sudah melakukan 5 kali bimbingan.",
            type: "LEMBAR_FORM_BIMBINGAN"
        },
        {
            title: "Form Pengajuan Pendaftaran Diseminasi KP",
            text: "Mengisi formulir pendaftaran diseminasi kerja praktik.",
            type: "PENGAJUAN_PENDAFTARAN_DISEMINASI"
        },
    ];

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setUploadedFiles(prev => ({
                ...prev,
                [type]: e.target.files![0]
            }));
        }
    };

    const uploadDocument = async (file: File, documentType: string) => {
        if (!nim || !userId) {
            console.error('Missing required props:', {nim, userId});
            throw new Error('NIM and UserID are required');
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('nim', String(nim));
        formData.append('userId', String(userId));
        formData.append('jenisDokumen', documentType);
        formData.append('kategori', 'PENDAFTARAN');

        // Debug formData
        console.log('FormData contents:');
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            const response = await axiosInstance.post('/mahasiswa/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsSubmitting(true);
        setUploadError("");

        try {
            const formattedData = {
                ...formData,
                nim,
                mulaiKp: new Date(formData.mulaiKp).toISOString().split('T')[0],
                selesaiKp: new Date(formData.selesaiKp).toISOString().split('T')[0],
                jabatanPembimbingInstansi: ""
            };

            console.log('Request data:', {
                url: '/mahasiswa/pendaftaran',
                method: 'POST',
                headers: axiosInstance.defaults.headers,
                data: formattedData
            });

            const response = await axiosInstance.post('/mahasiswa/pendaftaran', formattedData);
            console.log('Response:', response.data);

            setShowUploadModal(true);
        } catch (error: any) {
            console.error('Error details:', error.response?.data); // tambahkan logging detail error
            setUploadError(error.response?.data?.message || 'Error submitting form');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirm = async (): Promise<void> => {
        setIsSubmitting(true);
        setUploadError("");

        try {
            // Upload all documents
            const uploadPromises = Object.entries(uploadedFiles).map(([type, file]) =>
                uploadDocument(file, type)
            );

            await Promise.all(uploadPromises);
            setShowConfirmation(false);
            onClose();
        } catch (error: any) {
            console.error('Error uploading documents:', error);
            setUploadError(error.response?.data?.message || 'Error uploading documents');
        } finally {
            setIsSubmitting(false);
        }
    };

    const completedUploads = Object.keys(uploadedFiles).length;
    const progress = (completedUploads / documents.length) * 100;

    if (!isOpen) return null;

    const Upload: React.FC<DocumentPendaftaran> = ({ title, text, type }) => (
        <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{text}</p>
            <input
                type="file"
                onChange={handleFileChange(type)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".pdf,.doc,.docx"
            />
            {uploadedFiles[type] && (
                <p className="mt-2 text-sm text-green-600">
                    File selected: {uploadedFiles[type].name}
                </p>
            )}
        </div>
    );

    if (!isOpen) return null;

    if (showUploadModal) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Upload Dokumen Persyaratan
                            </h2>
                            <button
                                onClick={() => {
                                    setShowUploadModal(false);
                                    onClose();
                                }}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {documents.map((doc, index) => (
                            <Upload key={index} {...doc} />
                        ))}

                        <div className="mt-4">
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{width: `${progress}%`}}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                Progress File • {Object.keys(uploadedFiles).length} of {documents.length}
                            </p>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={() => setShowConfirmation(true)}
                                disabled={isSubmitting || Object.keys(uploadedFiles).length !== documents.length}
                                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-blue-300"
                            >
                                {isSubmitting ? 'Uploading...' : 'Kirim'}
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
    }

    // Main form JSX remains the same...
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Form Pendaftaran Diseminasi Kerja Praktik
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmitForm} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Judul Laporan
                            </label>
                            <input
                                type="text"
                                name="judulLaporan"
                                value={formData.judulLaporan}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Nama Instansi
                            </label>
                            <input
                                type="text"
                                name="namaInstansi"
                                value={formData.namaInstansi}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Alamat Instansi
                            </label>
                            <textarea
                                name="alamatInstansi"
                                value={formData.alamatInstansi}
                                onChange={handleChange}
                                rows={3}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Tanggal Mulai
                                </label>
                                <input
                                    type="date"
                                    name="mulaiKp"
                                    value={formData.mulaiKp}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Tanggal Selesai
                                </label>
                                <input
                                    type="date"
                                    name="selesaiKp"
                                    value={formData.selesaiKp}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Pembimbing Instansi
                            </label>
                            <input
                                type="text"
                                name="namaPembimbingInstansi"
                                value={formData.namaPembimbingInstansi}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Nomor Telepon
                                </label>
                                <input
                                    type="tel"
                                    name="noTeleponPembimbing"
                                    value={formData.noTeleponPembimbing}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email Pembimbing
                                </label>
                                <input
                                    type="email"
                                    name="emailPembimbingInstansi"
                                    value={formData.emailPembimbingInstansi}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            Lanjut
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

interface UploadPascaSeminarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Document {
    title: string;
    text: string;
}

export const UploadPascaSeminar: React.FC<UploadPascaSeminarProps> = ({
                                                                          isOpen,
                                                                          onClose,
                                                                      }) => {
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

    const documents: Document[] = [
        {
            title: "Surat Undangan Seminar Hasil KP",
            text: "Scan lembar pernyataan telah selesai melaksanakan KP, dapat di download pada link: https://s.id/pernyataan-selesai-kp",
        },
        {
            title: "Berita Acara Seminar",
            text: "Lembar Pernyataan Telah Selesai Melaksanakan KP yang sudah ditanda tangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP.",
        },
        {
            title: "Daftar Hadir Seminar",
            text: "Daily Report yang sudah ditanda tangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP.",
        },
        {
            title: "Lembar Pengesahan KP",
            text: "Laporan Tambahan tugas KP final yang sudah disetujui oleh dosen pembimbing KP.",
        },
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
                className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div
                    className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700">
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
                        <Upload key={index} title={doc.title} text={doc.text}/>
                    ))}

                    <div className="mt-4">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{width: "50%"}}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Progress File • 4 of 4
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
