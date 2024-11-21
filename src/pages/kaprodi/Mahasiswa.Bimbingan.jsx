import { Search, ListFilter} from 'lucide-react';
const MahasiswaBimbingan = () => {

    const mahasiswaBimbingan = [
        {
            name: "Gilang Ramadhan Indra",
            nim: "1234567890",
            department: "Teknik Informatika",
            status: "Aktif",
            progress: "Penyusunan Laporan",
            company: "PT. Teknologi Indonesia",
            deadline: "30 November 2024",
            lastBimbingan: "15 November 2024",
            action: "Lihat Detail"
        },
        {
            name: "Sarah Amelia",
            nim: "1234567891",
            department: "Teknik Informatika",
            status: "Pengajuan Seminar",
            progress: "Menunggu Jadwal",
            company: "PT. Digital Solusi",
            deadline: "25 November 2024",
            lastBimbingan: "10 November 2024",
            action: "Review Pengajuan"
        },
        {
            name: "Reza Pradana",
            nim: "1234567892",
            department: "Teknik Informatika",
            status: "Selesai",
            progress: "Selesai KP",
            company: "PT. Maju Bersama",
            deadline: "1 November 2024",
            lastBimbingan: "28 Oktober 2024",
            action: "Lihat Nilai"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="pt-10 px-8 pb-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold">Mahasiswa Bimbingan</h1>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white shadow-sm rounded-lg p-4 border-l-4 border-blue-500">
                        <p className="text-gray-600 text-sm">Total Mahasiswa</p>
                        <h2 className="text-2xl font-bold mt-1">3</h2>
                        <p className="text-blue-500 text-sm mt-2">Semester Ganjil 2024</p>
                    </div>
                    <div className="bg-white shadow-sm rounded-lg p-4 border-l-4 border-green-500">
                        <p className="text-gray-600 text-sm">Mahasiswa Aktif</p>
                        <h2 className="text-2xl font-bold mt-1">1</h2>
                        <p className="text-green-500 text-sm mt-2">Sedang KP</p>
                    </div>
                    <div className="bg-white shadow-sm rounded-lg p-4 border-l-4 border-yellow-500">
                        <p className="text-gray-600 text-sm">Pengajuan Seminar</p>
                        <h2 className="text-2xl font-bold mt-1">1</h2>
                        <p className="text-yellow-500 text-sm mt-2">Menunggu Review</p>
                    </div>
                    <div className="bg-white shadow-sm rounded-lg p-4 border-l-4 border-purple-500">
                        <p className="text-gray-600 text-sm">Selesai KP</p>
                        <h2 className="text-2xl font-bold mt-1">1</h2>
                        <p className="text-purple-500 text-sm mt-2">Lulus KP</p>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-lg shadow-sm">
                    {/* Search and Filter */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400"/>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari mahasiswa bimbingan..."
                                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                            </div>
                            <button
                                className="w-full sm:w-auto bg-white px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <ListFilter className="h-4 w-4"/>
                                Filter Status
                            </button>
                        </div>
                    </div>

                    {/* Student Cards */}
                    <div className="p-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {mahasiswaBimbingan.map((student, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                                            <p className="text-gray-600 text-sm">NIM: {student.nim}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs ${
                                            student.status === "Aktif"
                                                ? "bg-green-100 text-green-600"
                                                : student.status === "Pengajuan Seminar"
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : "bg-blue-100 text-blue-600"
                                        }`}>
                                            {student.status}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-gray-600 text-sm flex justify-between">
                                            <span>Progress:</span>
                                            <span className="font-medium">{student.progress}</span>
                                        </p>
                                        <p className="text-gray-600 text-sm flex justify-between">
                                            <span>Tempat KP:</span>
                                            <span className="font-medium">{student.company}</span>
                                        </p>
                                        <p className="text-gray-600 text-sm flex justify-between">
                                            <span>Deadline:</span>
                                            <span className="font-medium">{student.deadline}</span>
                                        </p>
                                        <p className="text-gray-600 text-sm flex justify-between">
                                            <span>Bimbingan Terakhir:</span>
                                            <span className="font-medium">{student.lastBimbingan}</span>
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <button
                                            className={`w-full py-2 rounded-lg font-medium transition-colors ${
                                                student.status === "Selesai"
                                                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                    : student.status === "Pengajuan Seminar"
                                                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                                        : "bg-blue-500 text-white hover:bg-blue-600"
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
        </div>
    )
}

export default MahasiswaBimbingan;