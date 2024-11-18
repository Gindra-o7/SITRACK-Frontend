import React from 'react';
import { Users, ClipboardList, FileCheck, UserCog, History, School } from 'lucide-react';

// Card Component
const Card = ({ title, description, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
                <div className="p-3 bg-blue-50 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                </div>
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const cards = [
        {
            title: "Manajemen Akun",
            description: "Kelola akun mahasiswa, dosen, pembimbing instansi, dan kaprodi dalam sistem.",
            path: "/koordinator/manage-accounts",
            icon: UserCog
        },
        {
            title: "Validasi Berkas",
            description: "Periksa dan validasi berkas pengajuan kerja praktik dari mahasiswa.",
            path: "/koordinator/validate-documents",
            icon: FileCheck
        },
        {
            title: "Pembimbing & Penguji",
            description: "Atur penunjukan dosen pembimbing dan penguji untuk mahasiswa.",
            path: "/koordinator/assign-supervisors",
            icon: Users
        },
        {
            title: "Riwayat",
            description: "Lihat riwayat aktivitas dan data kerja praktik semester sebelumnya.",
            path: "/koordinator/history",
            icon: History
        }
    ];

    // Stats data
    const stats = [
        { label: "Pengajuan Baru", value: "12" },
        { label: "Menunggu Validasi", value: "8" },
        { label: "Seminar Minggu Ini", value: "5" },
        { label: "Total Mahasiswa Aktif", value: "156" }
    ];

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <div className="flex-1 overflow-auto">
                <main className="p-6">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Selamat Datang, Dr. Ahmad Koordinator
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Koordinator Kerja Praktik Teknik Informatika
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Alert Section - if there are pending tasks */}
                    <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    Anda memiliki 8 berkas pengajuan yang perlu divalidasi hari ini
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cards.map((card, index) => (
                            <a href={card.path} key={index}>
                                <Card
                                    title={card.title}
                                    description={card.description}
                                    icon={card.icon}
                                />
                            </a>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;