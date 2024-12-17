import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  User,
  MapPinHouse,
  ChevronDown,
  Search,
  X,
} from "lucide-react";

const TambahJadwal = ({ onSubmit, initialData, onClose }) => {
  // Sample mahasiswa data - replace with your actual data source
  const mahasiswaList = [
    {
      id: 1,
      nama: "John Doe",
      nim: "123456",
      judul: "Implementasi Machine Learning untuk Prediksi Cuaca",
    },
    {
      id: 2,
      nama: "Jane Smith",
      nim: "234567",
      judul: "Pengembangan Sistem Informasi Berbasis Web",
    },
  ];

  const dosenPengujiList = [
    { id: 1, nama: "Dr. Rahmat Hidayat, M.Sc." },
    { id: 2, nama: "Prof. Siti Aisyah, Ph.D." },
    { id: 3, nama: "Dr. Budi Santoso, M.T." },
    { id: 4, nama: "Dr. Hidayat, M.Sc." },
    { id: 5, nama: "Prof.  Aisyah, Ph.D." },
    { id: 6, nama: "Dr. Santoso, M.T." },
  ];

  const ruanganOptions = [
    { value: "GB301", label: "GB301" },
    { value: "GB302", label: "GB302" },
    { value: "GB303", label: "GB303" },
  ];

  const [formData, setFormData] = useState({
    tanggal: "",
    waktu: "",
    mahasiswa: "",
    ruangan: "",
    dosenPenguji: "",
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
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mahasiswaDropdownRef.current &&
        !mahasiswaDropdownRef.current.contains(event.target)
      ) {
        setMahasiswaDropdownOpen(false);
      }

      if (
        dosenDropdownRef.current &&
        !dosenDropdownRef.current.contains(event.target)
      ) {
        setDosenDropdownOpen(false);
      }

      if (
        ruanganDropdownRef.current &&
        !ruanganDropdownRef.current.contains(event.target)
      ) {
        setRuanganDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate end time (1 hour after start time)
    const startTime = formData.waktu;
    const [hours, minutes] = startTime.split(":");
    const endHours = parseInt(hours) + 1;
    const timeRange = `${startTime} - ${endHours
      .toString()
      .padStart(2, "0")}:${minutes}`;

    const submissionData = {
      ...formData,
      waktu: timeRange,
    };
    onSubmit(submissionData);
  };

  const filteredMahasiswa = mahasiswaList.filter(
    (mahasiswa) =>
      mahasiswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mahasiswa.nim.includes(searchTerm)
  );

  const filteredDosenPenguji = dosenPengujiList.filter((dosen) =>
    dosen.nama.toLowerCase().includes(dosenSearchTerm.toLowerCase())
  );

  const dropdownButtonClass =
    "w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50 transition-colors duration-200";
  const dropdownItemClass =
    "px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center space-x-2 transition-colors duration-200";
  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200";

  return (
    <div className="fixed bg-white px-8 pt-6 pb-8 rounded-xl max-w-4xl w-full mx-auto z-50">
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
              id="tanggal"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
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
              id="waktu"
              name="waktu"
              value={formData.waktu}
              onChange={handleChange}
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
              {formData.mahasiswa || "Pilih mahasiswa..."}
            </span>
            <ChevronDown size={20} className="text-gray-500" />
          </button>

          {mahasiswaDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />
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
                      setFormData((prev) => ({
                        ...prev,
                        mahasiswa: mahasiswa.nama,
                        judul: mahasiswa.judul,
                      }));
                      setMahasiswaDropdownOpen(false);
                      setSearchTerm("");
                    }}
                    className={dropdownItemClass}
                  >
                    <User size={18} className="text-gray-500" />
                    <div>
                      <div className="font-medium">{mahasiswa.nama}</div>
                      <div className="text-sm text-gray-500">
                        {mahasiswa.nim}
                      </div>
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
              {formData.dosenPenguji || "Pilih dosen penguji..."}
            </span>
            <ChevronDown size={20} className="text-gray-500" />
          </button>

          {dosenDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />
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
                      setFormData((prev) => ({
                        ...prev,
                        dosenPenguji: dosen.nama,
                      }));
                      setDosenDropdownOpen(false);
                      setDosenSearchTerm("");
                    }}
                    className={dropdownItemClass}
                  >
                    <User size={18} className="text-gray-500" />
                    <span>{dosen.nama}</span>
                  </div>
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
                    className={dropdownItemClass}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        ruangan: ruangan.value,
                      }));
                      setRuanganDropdownOpen(false);
                    }}
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
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {initialData ? "Simpan Perubahan" : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahJadwal;
