import React, { useState } from 'react';
import { Search, ListFilter } from 'lucide-react';
import {InputNilaiDosenPenguji} from "../../modal/InputNilai"
import LihatNilai from '../../modal/LihatNilai';

type Student = {
    name: string;
    nim: string;
    department: string;
    status: string;
    company: string;
    pembimbing: string;
    judulKP: string;
    action: string;
};

const MahasiswaSeminar: React.FC = () => {
    const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const students: Student[] = [
        {
            name: 'Ahmad Fauzi',
            nim: '1234567893',
            department: 'Teknik Informatika',
            status: 'Menunggu Seminar',
            company: 'PT. Global Tech',
            pembimbing: 'Dr. Budi Santoso, M.Kom',
            judulKP: 'Pengembangan Sistem Informasi Berbasis Web Menggunakan React dan Node.js',
            action: 'Input Nilai',
        },
        {
            name: 'Linda Kusuma',
            nim: '1234567894',
            department: 'Teknik Informatika',
            status: 'Selesai Seminar',
            company: 'PT. Solusi Digital',
            pembimbing: 'Dr. Andi Wijaya, M.T',
            judulKP: 'Implementasi Machine Learning untuk Prediksi Penjualan',
            action: 'Lihat Nilai',
        },
        {
            name: 'Michael Wijaya',
            nim: '1234567895',
            department: 'Teknik Informatika',
            status: 'Menunggu Seminar',
            company: 'PT. Tech Inovasi',
            pembimbing: 'Dr. Siti Rahayu, M.Kom',
            judulKP: 'Pengembangan Aplikasi Mobile untuk Manajemen Inventory',
            action: 'Input Nilai',
        },
    ];

    const handleOpenInputModal = (student: Student) => {
        setSelectedStudent(student);
        setIsInputModalOpen(true);
    };

    const handleCloseInputModal = () => {
        setIsInputModalOpen(false);
        setSelectedStudent(null);
    };

    const handleOpenViewModal = (student: Student) => {
        setSelectedStudent(student);
        setIsViewModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedStudent(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="pt-10 px-8 pb-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold">Mahasiswa Seminar</h1>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {/* Repeated stats cards */}
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-lg shadow-sm">
                    {/* Search and Filter */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari mahasiswa seminar..."
                                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button className="w-full sm:w-auto bg-white px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <ListFilter className="h-4 w-4" />
                                Filter Status
                            </button>
                        </div>
                    </div>

                    {/* Student Cards */}
                    <div className="p-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {students.map((student, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                                            <p className="text-gray-600 text-sm">NIM: {student.nim}</p>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs ${
                                                student.status === 'Sedang Berlangsung'
                                                    ? 'bg-green-100 text-green-600'
                                                    : student.status === 'Menunggu Seminar'
                                                        ? 'bg-yellow-100 text-yellow-600'
                                                        : 'bg-blue-100 text-blue-600'
                                            }`}
                                        >
                      {student.status}
                    </span>
                                    </div>

                                    <div className="space-y-2 mb-3">
                                        <p className="text-gray-800 text-sm font-medium line-clamp-2">
                                            {student.judulKP}
                                        </p>
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                                        <p className="text-gray-600 text-sm flex justify-between">
                                            <span>Pembimbing:</span>
                                            <span className="font-medium">{student.pembimbing}</span>
                                        </p>
                                        <p className="text-gray-600 text-sm flex justify-between">
                                            <span>Tempat KP:</span>
                                            <span className="font-medium">{student.company}</span>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            onClick={() => {
                                                if (student.action === 'Input Nilai') {
                                                    handleOpenInputModal(student);
                                                } else if (student.action === 'Lihat Nilai') {
                                                    handleOpenViewModal(student);
                                                }
                                            }}
                                            className={`w-full py-2 rounded-lg font-medium transition-colors ${
                                                student.status === 'Selesai Seminar'
                                                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    : student.status === 'Sedang Berlangsung'
                                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                            }`}
                                        >
                                            {student.action}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <InputNilaiDosenPenguji
                isOpen={isInputModalOpen}
                onClose={handleCloseInputModal}
                student={selectedStudent}
            />
            <LihatNilai
                isOpen={isViewModalOpen}
                onClose={handleCloseViewModal}
                student={selectedStudent}
            />
        </div>
    );
};

export default MahasiswaSeminar;