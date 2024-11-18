import React, { useState } from 'react';
import { Award, User, BookOpen, Building2, CalendarCheck } from 'lucide-react';

const InputNilaiPembimbingInstansi = ({ isOpen, onClose, student }) => {
    const [selectedGrades, setSelectedGrades] = useState({
        deliverables: '',
        punctuality: '',
        discipline: '',
        attitude: '',
        teamwork: '',
        initiative: '',
    });
    const [comment, setComment] = useState('');

    const gradeOptions = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D'];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ studentId: student?.nim, grades: selectedGrades, comment });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">Input Nilai Mahasiswa</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <span className="sr-only">Close</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
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
                                <p className="font-medium">{student?.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">NIM</p>
                                <p className="font-medium">{student?.nim}</p>
                            </div>
                        </div>
                    </div>

                    {/* Judul KP */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="h-5 w-5 text-gray-400" />
                            <h4 className="font-medium text-gray-900">Judul Kerja Praktek</h4>
                        </div>
                        <p className="pl-7">{student?.title || 'Implementasi Sistem IoT untuk Smart Home'}</p>
                    </div>

                    {/* Tempat KP */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Building2 className="h-5 w-5 text-gray-400" />
                            <h4 className="font-medium text-gray-900">Tempat Kerja Praktek</h4>
                        </div>
                        <p className="pl-7">{student?.company || 'PT Technology Indonesia'}</p>
                    </div>

                    {/* Periode KP */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <CalendarCheck className="h-5 w-5 text-gray-400" />
                            <h4 className="font-medium text-gray-900">Periode</h4>
                        </div>
                        <p className="pl-7">{student?.period || '1 Januari 2024 - 1 Maret 2024'}</p>
                    </div>

                    {/* Form Penilaian */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Award className="h-5 w-5 text-gray-400" />
                            <h4 className="font-medium text-gray-900">Form Penilaian</h4>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6 pl-7">
                                {/* Grade inputs */}
                                {Object.entries({
                                    deliverables: 'Deliverables',
                                    punctuality: 'Ketepatan Waktu',
                                    discipline: 'Kedisiplinan',
                                    attitude: 'Attitude',
                                    teamwork: 'Kerjasama dalam Tim',
                                    initiative: 'Inisiatif'
                                }).map(([key, label]) => (
                                    <div key={key} className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">{label}</label>
                                        <div className="flex flex-wrap gap-2">
                                            {gradeOptions.map((grade) => (
                                                <button
                                                    key={`${key}-${grade}`}
                                                    type="button"
                                                    className={`px-4 py-2 text-sm rounded-lg ${
                                                        selectedGrades[key] === grade
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                    onClick={() => setSelectedGrades(prev => ({ ...prev, [key]: grade }))}
                                                >
                                                    {grade}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {/* Comment section */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Catatan / Komentar</label>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Tambahkan komentar..."
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputNilaiPembimbingInstansi;