import React, { useState, useEffect } from "react";

const TambahJadwal = ({ onSubmit, initialData, onClose }) => {
  const [formData, setFormData] = useState({
    tanggal: "",
    waktu: "",
    mahasiswa: "",
    judul: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {initialData ? "Edit Jadwal Seminar KP" : "Tambah Jadwal Seminar KP"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="tanggal"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tanggal
            </label>
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="waktu"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Waktu
            </label>
            <input
              type="time"
              id="waktu"
              name="waktu"
              value={formData.waktu}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="mahasiswa"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nama Mahasiswa
          </label>
          <input
            type="text"
            id="mahasiswa"
            name="mahasiswa"
            value={formData.mahasiswa}
            onChange={handleChange}
            placeholder="Masukkan nama mahasiswa"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="judul"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Judul
          </label>
          <input
            type="text"
            id="judul"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="Masukkan judul"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {initialData ? "Simpan Perubahan" : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahJadwal;
