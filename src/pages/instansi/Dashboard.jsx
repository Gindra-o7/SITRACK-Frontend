import { useState } from "react";
import { Search, ListFilter, LogOut } from 'lucide-react';
import InputNilai from "../../components/Modal/InputNilai.jsx";
import Notification from "../../components/Notification.jsx";
import LihatNilai from "../../components/Modal/LihatNilai.jsx";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Hapus data login dari localStorage/sessionStorage jika ada
        localStorage.removeItem('token'); // Sesuaikan dengan key yang Anda gunakan

        // Redirect ke landing page
        navigate('/'); // Sesuaikan dengan path landing page Anda
    };
    const [isInputModalOpen, setIsInputModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const students = [
        {
            nim: '1910518001',
            name: 'Budi Santoso',
            department: 'Teknik Informatika',
            status: 'Aktif',
            action: 'Input Nilai'
        },
        {
            nim: '1910518002',
            name: 'Ani Wijaya',
            department: 'Teknik Informatika',
            status: 'Aktif',
            action: 'Input Nilai'
        },
        {
            nim: '1910518003',
            name: 'Deni Pratama',
            department: 'Teknik Informatika',
            status: 'Selesai',
            action: 'Sudah Dinilai'
        }
    ];

    const handleOpenInputModal = (student) => {
        setSelectedStudent(student);
        setIsInputModalOpen(true);
    };

    const handleCloseInputModal = () => {
        setIsInputModalOpen(false);
        setSelectedStudent(null);
    };

    const handleOpenViewModal = (student) => {
        setSelectedStudent(student);
        setIsViewModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedStudent(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header section remains the same */}
            <header className="bg-white shadow fixed w-full top-0 z-30">
                <div className="flex justify-between items-center px-8 py-4">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl font-medium">SITRACK</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Notification/>
                        <LogOut
                            onClick={handleLogout}
                            className="w-6 h-6 bg-white cursor-pointer"
                        />
                    </div>
                </div>
            </header>

            {/* Main content section */}
            <main className="pt-20 px-8 pb-8">
                <h1 className="text-4xl font-semibold mb-6">Halo, Ahmad Supardi</h1>

                {/* Stats Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
                    <div className="bg-white shadow-lg border border-gray-200 text-black p-4 rounded-lg text-center">
                        <h2 className="text-2xl font-semibold">3</h2>
                        <p>Mahasiswa Aktif</p>
                    </div>
                    <div className="bg-white shadow-lg border border-gray-200 text-black p-4 rounded-lg text-center">
                        <h2 className="text-2xl font-semibold">2</h2>
                        <p>Menunggu Penilaian</p>
                    </div>
                    <div className="bg-white shadow-lg border border-gray-200 text-black p-4 rounded-lg text-center">
                        <h2 className="text-2xl font-semibold">1</h2>
                        <p>Mahasiswa Selesai KP</p>
                    </div>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-lg font-medium mb-4">Daftar Mahasiswa</h2>

                    {/* Search and filter section */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400"/>
                            </div>
                            <input
                                type="text"
                                placeholder="Cari mahasiswa..."
                                className="w-full pl-10 p-2 border border-gray-300 rounded-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                        </div>
                        <button className="w-full sm:w-auto bg-white text-black px-6 py-2 rounded-lg sm:rounded-l-none border border-gray-300 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                            <ListFilter className="h-4 w-4"/>
                            Filter
                        </button>
                    </div>

                    {/* Student cards grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {students.map((student, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white rounded-lg shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                                    <p className="text-gray-600">NIM: {student.nim}</p>
                                    <p className="text-gray-600">Jurusan: {student.department}</p>
                                    <div className="mt-2">
                                        <span className={`px-3 py-1 rounded-full text-white text-sm ${
                                            student.status === "Aktif" ? "bg-green-500" : "bg-gray-500"
                                        }`}>
                                            {student.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={() => {
                                            if (student.action === "Input Nilai") {
                                                handleOpenInputModal(student);
                                            } else if (student.action === "Sudah Dinilai") {
                                                handleOpenViewModal(student);
                                            }
                                        }}
                                        className={`w-full py-2 rounded-lg font-medium transition-colors ${
                                            student.action === "Sudah Dinilai"
                                                ? "bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200"
                                                : "bg-white hover:bg-gray-200 text-black border border-gray-200"
                                        } focus:outline-none focus:ring-2 focus:ring-gray-400`}
                                    >
                                        {student.action}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Modals */}
            <InputNilai
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

export default Dashboard;