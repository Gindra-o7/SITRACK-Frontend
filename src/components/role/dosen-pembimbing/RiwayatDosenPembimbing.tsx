import React, { useState } from "react";
import { Search, Calendar, Building, FileText } from 'lucide-react';

type Student = {
    nim: string;
    name: string;
    company: string;
    startDate: string;
    endDate: string;
    projectTitle: string;
    finalGrade: string;
    status: string;
};

type Period = {
    period: string;
    students: Student[];
};

const Riwayat: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<string>("2024");
    const [selectedSemester, setSelectedSemester] = useState<string>("Genap");

    const riwayatData: Period[] = [
        {
            period: "Genap 2023/2024",
            students: [
                {
                    nim: "1910512001",
                    name: "Rahmat Hidayat",
                    company: "PT. Digital Solusi Indonesia",
                    startDate: "1 Februari 2024",
                    endDate: "30 April 2024",
                    projectTitle: "Pengembangan Sistem ERP",
                    finalGrade: "A",
                    status: "Lulus"
                },
                {
                    nim: "1910512002",
                    name: "Sarah Putri",
                    company: "PT. Tech Innovation",
                    startDate: "1 Februari 2024",
                    endDate: "30 April 2024",
                    projectTitle: "Implementasi Sistem IoT",
                    finalGrade: "A-",
                    status: "Lulus"
                }
            ]
        },
        {
            period: "Ganjil 2023/2024",
            students: [
                {
                    nim: "1910511001",
                    name: "Ahmad Riza",
                    company: "PT. Global Technology",
                    startDate: "1 September 2023",
                    endDate: "30 November 2023",
                    projectTitle: "Pengembangan Mobile App",
                    finalGrade: "B+",
                    status: "Lulus"
                }
            ]
        }
    ];

    const filteredData = riwayatData.filter(period =>
        period.students.some(student =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.nim.includes(searchQuery) ||
            student.company.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="py-8 px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-800">Riwayat Bimbingan</h1>
                    <p className="text-gray-600 mt-2">Daftar riwayat bimbingan mahasiswa kerja praktik</p>
                </div>

                {/* Filter and Search Section */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari berdasarkan nama, NIM, atau perusahaan..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex gap-4">
                                <select
                                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                >
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                </select>
                                <select
                                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedSemester}
                                    onChange={(e) => setSelectedSemester(e.target.value)}
                                >
                                    <option value="Genap">Semester Genap</option>
                                    <option value="Ganjil">Semester Ganjil</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* History Cards */}
                {filteredData.map((period, periodIndex) => (
                    <div key={periodIndex} className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">{period.period}</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {period.students.map((student, studentIndex) => (
                                <div key={studentIndex} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                                            <p className="text-gray-600 text-sm">NIM: {student.nim}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            student.status === "Lulus"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-yellow-100 text-yellow-600"
                                        }`}>
                                            {student.status}
                                        </span>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Building className="h-4 w-4" />
                                            <span>{student.company}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="h-4 w-4" />
                                            <span>{student.startDate} - {student.endDate}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FileText className="h-4 w-4" />
                                            <span>{student.projectTitle}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <div>
                                            <p className="text-sm text-gray-600">Nilai Akhir</p>
                                            <p className="text-2xl font-semibold text-blue-600">{student.finalGrade}</p>
                                        </div>
                                        <button className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                            Lihat Detail
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Empty State */}
                {filteredData.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-600">Tidak ada data yang ditemukan</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Riwayat;