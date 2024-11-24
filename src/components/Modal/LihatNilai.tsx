import React from 'react';
import { Award, User, BookOpen, Building2, CalendarCheck, X } from 'lucide-react';

interface InputNilaiProps {
    isOpen: boolean;
    onClose: () => void;
}

interface StudentGrades {
    pembimbing: number;
    penguji: number;
    pembimbingInstansi: number;
    nilaiAkhir: number;
}

const InputNilai: React.FC<InputNilaiProps> = ({isOpen, onClose}) => {
    if (!isOpen) return null;

    const grades: StudentGrades = {
        pembimbing: 85.5,
        penguji: 87.5,
        pembimbingInstansi: 90.0,
        nilaiAkhir: 87.67
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">Detail Nilai Mahasiswa</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            type="button"
                        >
                            <span className="sr-only">Close</span>
                            <X />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Informasi Mahasiswa */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <User className="h-5 w-5 text-gray-400" />
                            <h4 className="font-medium text-gray-900">Informasi Mahasiswa</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pl-7">
                            <div>
                                <p className="text-sm text-gray-500">Nama</p>
                                <p className="font-medium">John Doe</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">NIM</p>
                                <p className="font-medium">1234567890</p>
                            </div>
                        </div>
                    </div>

                    {/* Judul KP */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="h-5 w-5 text-gray-400" />
                            <h4 className="font-medium text-gray-900">Judul Kerja Praktek</h4>
                        </div>
                        <p className="pl-7">Implementasi Sistem IoT untuk Smart Home</p>
                    </div>

                    {/* Tempat KP */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Building2 className="h-5 w-5 text-gray-400" />
                            <h4 className="font-medium text-gray-900">Tempat Kerja Praktek</h4>
                        </div>
                        <p className="pl-7">PT Technology Indonesia</p>
                    </div>

                    {/* Periode KP */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <CalendarCheck className="h-5 w-5 text-gray-400" />
                            <h4 className="font-medium text-gray-900">Periode</h4>
                        </div>
                        <p className="pl-7">1 Januari 2024 - 1 Maret 2024</p>
                    </div>

                    {/* Nilai */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Award className="h-5 w-5 text-gray-400" />
                            <h4 className="font-medium text-gray-900">Nilai</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pl-7">
                            <div className="col-span-2">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Nilai Pembimbing</p>
                                            <p className="text-lg font-semibold">{grades.pembimbing.toFixed(1)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Nilai Penguji</p>
                                            <p className="text-lg font-semibold">{grades.penguji.toFixed(1)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Nilai Pembimbing Instansi</p>
                                            <p className="text-lg font-semibold">{grades.pembimbingInstansi.toFixed(1)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Nilai Akhir</p>
                                            <p className="text-lg font-semibold text-blue-600">{grades.nilaiAkhir.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={onClose}
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InputNilai;