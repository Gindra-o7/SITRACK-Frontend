import React, { useState, useEffect, useRef } from 'react';
import {
    Calendar,
    Clock,
    User,
    MapPinHouse,
    ChevronDown,
    Search,
    X,
} from 'lucide-react';
import { Toast } from 'flowbite-react';
import { HiCheck, HiX } from 'react-icons/hi';
import axiosInstance from "../../configs/axios.configs.ts"

interface Mahasiswa {
    id: string;
    nama: string;
    nim: string;
    judul: string;
}

interface DosenPenguji {
    id: string;
    nama: string;
}

interface FormData {
    tanggal: string;
    waktu: string;
    mahasiswaId: string;
    mahasiswaNama: string;
    dosenPengujiId: string;
    dosenPengujiNama: string;
    ruangan: string;
}

interface ToastMessage {
    type: 'success' | 'error';
    message: string;
}

const TambahJadwal = ({ onSubmit, initialData, onClose }) => {
    const [mahasiswaList, setMahasiswaList] = useState<Mahasiswa[]>([]);
    const [dosenPengujiList, setDosenPengujiList] = useState<DosenPenguji[]>([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<ToastMessage | null>(null);

    const ruanganOptions = [
        { value: "FST301", label: "FST301" },
        { value: "FST302", label: "FST302" },
        { value: "FST303", label: "FST303" },
        { value: "FST304", label: "FST304" },
        { value: "FST305", label: "FST305" },
        { value: "FST306", label: "FST306" },
    ];

    const [formData, setFormData] = useState<FormData>({
        tanggal: "",
        waktu: "",
        mahasiswaId: "",
        mahasiswaNama: "",
        dosenPengujiId: "",
        dosenPengujiNama: "",
        ruangan: "",
    });

    const [mahasiswaDropdownOpen, setMahasiswaDropdownOpen] = useState(false);
    const [ruanganDropdownOpen, setRuanganDropdownOpen] = useState(false);
    const [dosenDropdownOpen, setDosenDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [dosenSearchTerm, setDosenSearchTerm] = useState("");

    const mahasiswaDropdownRef = useRef(null);
    const dosenDropdownRef = useRef(null);
    const ruanganDropdownRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mahasiswaRes, dosenRes] = await Promise.all([
                    axiosInstance.get('/koordinator/jadwal-mahasiswa'),
                    axiosInstance.get('/koordinator/jadwal/dosen-penguji')
                ]);

                setMahasiswaList(mahasiswaRes.data);
                setDosenPengujiList(dosenRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setToast({
                    type: 'error',
                    message: 'Gagal memuat data'
                });
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        const checkDosenAvailability = async () => {
            if (formData.tanggal && formData.waktu && formData.dosenPengujiId) {
                try {
                    const response = await axiosInstance.get('/koordinator/check-dosen-availability', {
                        params: {
                            dosenId: formData.dosenPengujiId,
                            tanggal: formData.tanggal,
                            waktuMulai: formData.waktu
                        }
                    });

                    if (!response.data.available) {
                        setToast({
                            type: 'error',
                            message: response.data.message
                        });
                    }
                } catch (error) {
                    console.error('Error checking availability:', error);
                }
            }
        };

        checkDosenAvailability();
    }, [formData.tanggal, formData.waktu, formData.dosenPengujiId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.post('/koordinator/jadwal', {
                tanggal: formData.tanggal,
                waktuMulai: formData.waktu,
                mahasiswaId: formData.mahasiswaId,
                dosenPengujiId: formData.dosenPengujiId,
                ruangan: formData.ruangan
            });

            setToast({
                type: 'success',
                message: 'Jadwal berhasil ditambahkan'
            });

            onSubmit(response.data);
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error: any) {
            console.error('Error creating schedule:', error);
            setToast({
                type: 'error',
                message: error.response?.data?.error || 'Gagal menambahkan jadwal'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mahasiswaDropdownRef.current &&
                !mahasiswaDropdownRef.current.contains(event.target)) {
                setMahasiswaDropdownOpen(false);
            }
            if (dosenDropdownRef.current &&
                !dosenDropdownRef.current.contains(event.target)) {
                setDosenDropdownOpen(false);
            }
            if (ruanganDropdownRef.current &&
                !ruanganDropdownRef.current.contains(event.target)) {
                setRuanganDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredMahasiswa = Array.isArray(mahasiswaList)
        ? mahasiswaList.filter((mahasiswa) =>
            mahasiswa?.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mahasiswa?.nim?.includes(searchTerm)
        )
        : [];

    const filteredDosenPenguji = Array.isArray(dosenPengujiList)
        ? dosenPengujiList.filter((dosen) =>
            dosen?.nama?.toLowerCase().includes(dosenSearchTerm.toLowerCase())
        )
        : [];

    const dropdownButtonClass = "w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50 transition-colors duration-200";
    const dropdownItemClass = "px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center space-x-2 transition-colors duration-200";
    const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white px-8 pt-6 pb-8 rounded-xl max-w-4xl w-full">
                {toast && (
                    <div className="absolute top-4 right-4 z-50">
                        <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                                {toast.type === 'success' ? (
                                    <HiCheck className="h-5 w-5 text-green-500" />
                                ) : (
                                    <HiX className="h-5 w-5 text-red-500" />
                                )}
                            </div>
                            <div className="ml-3 text-sm font-normal">
                                {toast.message}
                            </div>
                            <Toast.Toggle onDismiss={() => setToast(null)} />
                        </Toast>
                    </div>
                )}

                <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                    <h3 className="text-2xl font-semibold text-gray-900">
                        {initialData ? "Edit Jadwal Seminar KP" : "Tambah Jadwal Seminar KP"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                                <Calendar size={18} className="text-gray-500" />
                                <span>Tanggal</span>
                            </label>
                            <input
                                type="date"
                                value={formData.tanggal}
                                onChange={(e) => setFormData(prev => ({ ...prev, tanggal: e.target.value }))}
                                className={inputClass}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                                <Clock size={18} className="text-gray-500" />
                                <span>Waktu</span>
                            </label>
                            <input
                                type="time"
                                value={formData.waktu}
                                onChange={(e) => setFormData(prev => ({ ...prev, waktu: e.target.value }))}
                                className={inputClass}
                                required
                            />
                        </div>
                    </div>

                    <div className="relative" ref={mahasiswaDropdownRef}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                            <User size={18} className="text-gray-500" />
                            <span>Nama Mahasiswa</span>
                        </label>
                        <button
                            type="button"
                            onClick={() => setMahasiswaDropdownOpen(!mahasiswaDropdownOpen)}
                            className={dropdownButtonClass}
                        >
                            <span className="text-left flex-1">
                                {formData.mahasiswaNama || "Pilih mahasiswa..."}
                            </span>
                            <ChevronDown size={20} className="text-gray-500" />
                        </button>

                        {mahasiswaDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                <div className="p-3 border-b border-gray-200">
                                    <div className="relative">
                                        <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Cari mahasiswa..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="max-h-64 overflow-y-auto py-2">
                                    {filteredMahasiswa.map((mahasiswa) => (
                                        <div
                                            key={mahasiswa.id}
                                            onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    mahasiswaId: mahasiswa.id,
                                                    mahasiswaNama: mahasiswa.nama
                                                }));
                                                setMahasiswaDropdownOpen(false);
                                                setSearchTerm("");
                                            }}
                                            className={dropdownItemClass}
                                        >
                                            <User size={18} className="text-gray-500" />
                                            <div>
                                                <div className="font-medium">{mahasiswa.nama}</div>
                                                <div className="text-sm text-gray-500">{mahasiswa.nim}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative" ref={dosenDropdownRef}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                            <User size={18} className="text-gray-500" />
                            <span>Dosen Penguji</span>
                        </label>
                        <button
                            type="button"
                            onClick={() => setDosenDropdownOpen(!dosenDropdownOpen)}
                            className={dropdownButtonClass}
                        >
                            <span className="text-left flex-1">
                                {formData.dosenPengujiNama || "Pilih dosen penguji..."}
                            </span>
                            <ChevronDown size={20} className="text-gray-500" />
                        </button>

                        {dosenDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                <div className="p-3 border-b border-gray-200">
                                    <div className="relative">
                                        <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Cari dosen..."
                                            value={dosenSearchTerm}
                                            onChange={(e) => setDosenSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="max-h-64 overflow-y-auto py-2">
                                    {filteredDosenPenguji.map((dosen) => (
                                        <div
                                            key={dosen.id}
                                            onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    dosenPengujiId: dosen.id,
                                                    dosenPengujiNama: dosen.nama
                                                }));
                                                setDosenDropdownOpen(false);
                                                setDosenSearchTerm("");
                                            }}
                                            className={dropdownItemClass}
                                        >
                                            <User size={18} className="text-gray-500" />
                                            <span>{dosen.nama}</span></div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative" ref={ruanganDropdownRef}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                            <MapPinHouse size={18} className="text-gray-500" />
                            <span>Ruangan</span>
                        </label>
                        <button
                            type="button"
                            onClick={() => setRuanganDropdownOpen(!ruanganDropdownOpen)}
                            className={dropdownButtonClass}
                        >
                            <span className="text-left flex-1">
                                {formData.ruangan || "Pilih ruangan..."}
                            </span>
                            <ChevronDown size={20} className="text-gray-500" />
                        </button>

                        {ruanganDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                <div className="py-2">
                                    {ruanganOptions.map((ruangan) => (
                                        <div
                                            key={ruangan.value}
                                            onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    ruangan: ruangan.value
                                                }));
                                                setRuanganDropdownOpen(false);
                                            }}
                                            className={dropdownItemClass}
                                        >
                                            <MapPinHouse size={18} className="text-gray-500" />
                                            <span>{ruangan.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                            disabled={loading}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:bg-blue-400"
                            disabled={loading}
                        >
                            {loading ? 'Menyimpan...' : (initialData ? 'Simpan Perubahan' : 'Simpan')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TambahJadwal;