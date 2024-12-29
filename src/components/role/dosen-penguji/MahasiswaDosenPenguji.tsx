import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import InputNilaiDosenPenguji from "../../modal/InputNilaiDosenPenguji"
import LihatNilai from '../../modal/LihatNilai';
import axiosInstance from "../../../configs/axios.configs.ts";

type Student = {
    name: string;
    nim: string;
    department: string;
    status: string;
    company: string;
    pembimbing: string;
    judulKP: string;
    action: string;
    jadwalSeminarId: string;
};

interface UserData {
    nama: string;
    email: string;
    userRoles: {
        role: {
            name: string;
        };
    }[];
    dosen: {
        id: string;
    };
}

const MahasiswaSeminar: React.FC = () => {
    const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axiosInstance.get('/dosen-penguji/me');
                const userData = userResponse.data;

                if (!userData?.dosen?.id) {
                    throw new Error('Dosen ID not found');
                }

                const studentsResponse = await axiosInstance.get(`/dosen-penguji/mahasiswa/${userData.dosen.id}`);

                if (studentsResponse.data?.success) {
                    setStudents(studentsResponse.data.data);
                } else {
                    setStudents(studentsResponse.data);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Gagal mengambil data mahasiswa');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmitNilai = async (nilai: number, student: Student) => {
        try {

            await axiosInstance.post(`/dosen-penguji/inputnilai`, {
                jadwalSeminarId: student.jadwalSeminarId,
                nilaiPenguji: nilai,
            });

            handleCloseInputModal();
        } catch (error) {
            console.error('Error submitting nilai:', error);
        }
    };

    const getStatusDisplay = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Menunggu Seminar';
            case 'scheduled':
                return 'Terjadwal';
            case 'completed':
                return 'Selesai Seminar';
            case 'cancelled':
                return 'Dibatalkan';
            default:
                return status;
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-600';
            case 'scheduled':
                return 'bg-blue-100 text-blue-600';
            case 'completed':
                return 'bg-green-100 text-green-600';
            case 'cancelled':
                return 'bg-red-100 text-red-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    // Handle Input Nilai
    const handleOpenInputModal = (student: Student) => {
        setSelectedStudent(student);
        setIsInputModalOpen(true);
    };

    const handleCloseInputModal = () => {
        setIsInputModalOpen(false);
        setSelectedStudent(null);
    };

    // Handle Lihat Nilai
    const handleOpenViewModal = (student: Student) => {
        setSelectedStudent(student);
        setIsViewModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedStudent(null);
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.nim.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-red-600">{error}</div>
            </div>
        );
    }

    const renderActionButtons = (student: Student) => {
        const hasExistingScore = student.action.startsWith('View/');

        return (
            <div className="mt-4 space-y-2">
                {/* Button untuk Input Nilai (jika belum ada nilai dan status scheduled) */}
                {hasExistingScore && student.status === 'scheduled' && (
                    <button
                        onClick={() => handleOpenInputModal(student)}
                        className="w-full py-2 rounded-lg font-medium bg-green-500 text-white hover:bg-green-600 transition-colors"
                    >
                        Input Nilai
                    </button>
                )}

                {/* Button untuk Input Nilai Ulang */}
                {hasExistingScore && student.status === 'completed' && (
                    <button
                        onClick={() => handleOpenInputModal(student)}
                        className="w-full py-2 rounded-lg font-medium bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                    >
                        Input Nilai Ulang
                    </button>
                )}

                {/* Button untuk Lihat Nilai */}
                {!hasExistingScore && (
                    <button
                        onClick={() => handleOpenViewModal(student)}
                        className="w-full py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                        Lihat Nilai
                    </button>
                )}
            </div>
        );
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <main className="pt-10 px-8 pb-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold">Mahasiswa Seminar</h1>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
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
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {filteredStudents.map((student, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                                            <p className="text-gray-600 text-sm">NIM: {student.nim}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(student.status)}`}>
                                            {getStatusDisplay(student.status)}
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

                                    {renderActionButtons(student)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal for Input Nilai */}
            {isInputModalOpen && (
                <InputNilaiDosenPenguji
                    isOpen={isInputModalOpen}
                    onClose={handleCloseInputModal}
                    student={selectedStudent}
                    onSubmit={(nilai) => selectedStudent && handleSubmitNilai(nilai, selectedStudent)}
                />
            )}

            {/* Modal for Lihat Nilai */}
            {isViewModalOpen && (
                <LihatNilai
                    isOpen={isViewModalOpen}
                    onClose={handleCloseViewModal}
                    student={selectedStudent}
                />
            )}
        </div>
    );
};

export default MahasiswaSeminar;