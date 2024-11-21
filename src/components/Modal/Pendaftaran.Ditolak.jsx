import React from "react";
import {
    X,
    User,
    UserCheck,
    Briefcase,
    FileText,
    Calendar,
    MapPin,
    IdCard,
} from "lucide-react";

const PendaftaranDitolak = ({
                                title,
                                judulKP = "Analisis Kinerja Jaringan Komputer pada Sistem Informasi Akademik",
                                nama = "Muhammad Rizki",
                                nim = "12150111478S",
                                alamatInstansi = "Jl. Soekarno Hatta No. 12, Pekanbaru",
                                tanggalMulai = "2024-09-01",
                                tanggalSelesai = "2024-11-30",
                                pembimbingInstansi = {
                                    name: "Budi Santoso, S.T.",
                                    position: "Staff Teknik Informatika",
                                },
                                dosenPembimbing = {
                                    name: "Dr. Ir. Susanto, M.T.",
                                    nip: "NIP. 198901012019031008",
                                },
                                catatan = [
                                    "Format laporan tidak sesuai dengan ketentuan",
                                    "Tanda tangan pembimbing lapangan belum valid",
                                ],
                                isOpen = true,
                                onClose,
                            }) => {
    if (!isOpen) return null;

    // Fungsi untuk memformat tanggal
    const formatTanggal = (tanggal) => {
        const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };
        return new Date(tanggal).toLocaleDateString("id-ID", options);
    };

    // Fungsi untuk menghitung durasi
    const hitungDurasi = (mulai, selesai) => {
        const tanggalMulai = new Date(mulai);
        const tanggalSelesai = new Date(selesai);
        const diffTime = Math.abs(tanggalSelesai - tanggalMulai);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-red-500 dark:bg-gray-900 p-6 border-b sticky top-0 z-50">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-white text-xl font-medium dark:text-white">
                                {title} <span className="font-bold">Ditolak!</span>
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Judul Kerja Praktik */}
                    <div className="col-span-2">
                        <div className="border-b-2 border-red-200 rounded-lg p-4 flex items-center space-x-4 mb-4">
                            <div className="bg-red-100 rounded-full p-3">
                                <FileText className="text-red-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-red-700">
                                    Laporan Kerja Praktik (KP)
                                </p>
                                <h3 className="text-lg font-bold text-red-800 mb-1">
                                    {judulKP}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Detail Mahasiswa dan Waktu */}
                    <div className=" p-6 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <User className="text-red-600" size={20} />
                                    <div>
                                        <p className="text-sm font-medium text-red-800">
                                            Nama Mahasiswa
                                        </p>
                                        <p className="text-base font-semibold text-red-900">
                                            {nama}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <IdCard className="text-red-600" size={20} />
                                    <div>
                                        <p className="text-sm font-medium text-red-800">NIM</p>
                                        <p className="text-base font-semibold text-red-900">
                                            {nim}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <MapPin className="text-red-600" size={20} />
                                    <div>
                                        <p className="text-sm font-medium text-red-800">
                                            Alamat Instansi
                                        </p>
                                        <p className="text-base font-semibold text-red-900">
                                            {alamatInstansi}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Calendar className="text-red-600" size={20} />
                                    <div>
                                        <p className="text-sm font-medium text-red-800">Durasi</p>
                                        <div className="flex items-center space-x-2">
                                            <p className="text-base font-semibold text-red-900">
                                                {formatTanggal(tanggalMulai)} -{" "}
                                                {formatTanggal(tanggalSelesai)}
                                            </p>
                                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {hitungDurasi(tanggalMulai, tanggalSelesai)} Hari
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dosen Pembimbing, Penguji, dan Pembimbing Instansi Cards */}
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                        {/* Pembimbing Instansi Card */}
                        <div className="bg-red-50 bg-opacity-70 border border-red-200 rounded-lg p-4 flex items-center space-x-4">
                            <div className="bg-red-100 rounded-full p-3">
                                <Briefcase className="text-red-600" size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-red-800">
                                    Pembimbing Instansi
                                </h3>
                                <p className="text-sm text-red-700">
                                    {pembimbingInstansi.name}
                                </p>
                                <p className="text-xs text-red-600">
                                    {pembimbingInstansi.position}
                                </p>
                            </div>
                        </div>

                        {/* Dosen Pembimbing Card */}
                        <div className="bg-red-50 bg-opacity-70 border border-red-200 rounded-lg p-4 flex items-center space-x-4">
                            <div className="bg-red-100 rounded-full p-3">
                                <User className="text-red-600" size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-red-800">
                                    Dosen Pembimbing
                                </h3>
                                <p className="text-sm text-red-700">{dosenPembimbing.name}</p>
                                <p className="text-xs text-red-600">{dosenPembimbing.nip}</p>
                            </div>
                        </div>
                    </div>

                    {/* Catatan Penolakan */}
                    {catatan && catatan.length > 0 && (
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Catatan
                            </label>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <ul className="list-disc list-inside text-sm text-red-700 space-y-2">
                                    {catatan.map((note, index) => (
                                        <li key={index}>{note}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PendaftaranDitolak;