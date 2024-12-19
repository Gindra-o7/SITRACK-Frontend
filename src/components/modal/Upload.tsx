import React, { useState, FormEvent, ChangeEvent } from "react";
import Upload from "../Upload.Form";
import { X } from "lucide-react";
import ModalConfirm from "./Confirm";

interface UploadPersyaratanProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Document {
  title: string;
  text: string;
}

export const UploadPersyaratan = ({
  isOpen,
  onClose,
}: UploadPersyaratanProps): JSX.Element | null => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const documents: Document[] = [
    {
      title: "Surat Keterangan Selesai KP dari Instansi",
      text: "Lembar pernyataan sudah ditandatangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP. Link template: https://s.id/pernyataan-selesai-kp",
    },
    {
      title: "Lembar Pernyataan Telah Selesai KP",
      text: "Lembar Pernyataan Telah Selesai Melaksanakan KP yang sudah ditanda tangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP.",
    },
    {
      title: "Daily Report",
      text: "Daily Report yang sudah ditanda tangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP.",
    },
    {
      title: "Laporan Tambahan Tugas KP",
      text: "Laporan Tambahan tugas KP final yang sudah disetujui oleh dosen pembimbing KP.",
    },
    {
      title: "Surat Bimbingan Dosen Pembimbing",
      text: "Sudah melakukan minimal lima kali bimbingan kepada dosen pembimbing selama melaksanakan kegiatan KP.",
    },
    {
      title: "Setoran Hafalan Surat 1 - 16 Pada Juz",
      text: "Sudah memenuhi setoran hafalan surat 1 - 16 pada juz 30 sesuai Form Setoran Hafalan kepada Dosen Pembimbing Akademik.",
    },
    {
      title: "Form Kehadiran Pada Seminar KP",
      text: "Telah menghadiri Seminar KP mahasiswa lain minimal lima kali seminar yang dibuktikan dengan Form Kehadiran Pada Seminar KP.",
    },
  ];

  const handleSubmit = (): void => {
    setShowConfirmation(true);
  };

  const handleConfirm = (): void => {
    // Handle the actual submission here
    setShowConfirmation(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Upload Dokumen Persyaratan
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {documents.map((doc, index) => (
            <Upload key={index} title={doc.title} text={doc.text} />
          ))}

          <div className="mt-4">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "50%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Progress File • 7 of 7
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>

      <ModalConfirm
        text="Anda yakin akan melakukan pengiriman"
        confirm="Yakin"
        cancel="Tidak"
        isOpen={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirmation(false)}
      />
    </div>
  );
};

interface UploadPendaftaranProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormDataType {
  judulKp: string;
  namaInstansi: string;
  alamatInstansi: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  pembimbingInstansi: string;
  nomorTelepon: string;
  emailPembimbing: string;
}

interface Document {
  title: string;
  text: string;
}

export const UploadPendaftaran: React.FC<UploadPendaftaranProps> = ({
  isOpen,
  onClose,
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    judulKp: "",
    namaInstansi: "",
    alamatInstansi: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    pembimbingInstansi: "",
    nomorTelepon: "",
    emailPembimbing: "",
  });

  const documents: Document[] = [
    {
      title: "Lembar Pernyataan Telah Selesai Melaksanakan KP",
      text: "Lembar Pernyataan Telah Selesai Melaksanakan KP yang sudah ditanda tangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP.",
    },
    {
      title: "Lembar form bimbingan KP",
      text: "Minimal sudah melakukan 5 kali bimbingan.",
    },
    {
      title: "Setoran Hafalan Surat 1 - 16 Pada Juz",
      text: "Sudah memenuhi setoran hafalan surat 1 - 16 pada juz 30 sesuai Form Setoran Hafalan kepada Dosen Pembimbing Akademik.",
    },
    {
      title: "Form Pengajuan Pendaftaran Diseminasi KP",
      text: "Mengisi formulir pendaftaran diseminasi kerja praktik dan dapat di download dari link berikut : https://s.id/form-diseminasi-kp",
    },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setShowUploadModal(true);
  };

  const handleSubmitDoc = (): void => {
    setShowConfirmation(true);
  };

  const handleConfirm = (): void => {
    // Handle the actual submission here
    setShowConfirmation(false);
    onClose();
  };

  if (!isOpen) return null;

  if (showUploadModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Upload Dokumen Persyaratan
              </h2>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  onClose();
                }}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {documents.map((doc, index) => (
              <Upload key={index} title={doc.title} text={doc.text} />
            ))}

            <div className="mt-4">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Progress File • 7 of 7
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={handleSubmitDoc}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
        <ModalConfirm
          text="Anda yakin akan melakukan pengiriman"
          confirm="Yakin"
          cancel="Tidak"
          isOpen={showConfirmation}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirmation(false)}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Form Pendaftaran Diseminasi Kerja Praktik
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Judul Laporan
              </label>
              <input
                type="text"
                name="judulKp"
                value={formData.judulKp}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nama Instansi
              </label>
              <input
                type="text"
                name="namaInstansi"
                value={formData.namaInstansi}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Alamat Instansi
              </label>
              <textarea
                name="alamatInstansi"
                value={formData.alamatInstansi}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  name="tanggalMulai"
                  value={formData.tanggalMulai}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  name="tanggalSelesai"
                  value={formData.tanggalSelesai}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pembimbing Instansi
              </label>
              <input
                type="text"
                name="pembimbingInstansi"
                value={formData.pembimbingInstansi}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  name="nomorTelepon"
                  value={formData.nomorTelepon}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Pembimbing
                </label>
                <input
                  type="email"
                  name="emailPembimbing"
                  value={formData.emailPembimbing}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Lanjut
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface UploadPascaSeminarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Document {
  title: string;
  text: string;
}

export const UploadPascaSeminar: React.FC<UploadPascaSeminarProps> = ({
  isOpen,
  onClose,
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const documents: Document[] = [
    {
      title: "Surat Undangan Seminar Hasil KP",
      text: "Scan lembar pernyataan telah selesai melaksanakan KP, dapat di download pada link: https://s.id/pernyataan-selesai-kp",
    },
    {
      title: "Berita Acara Seminar",
      text: "Lembar Pernyataan Telah Selesai Melaksanakan KP yang sudah ditanda tangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP.",
    },
    {
      title: "Daftar Hadir Seminar",
      text: "Daily Report yang sudah ditanda tangani dan distempel basah oleh instansi KP, juga sudah ditanda tangan basah oleh dosen pembimbing KP.",
    },
    {
      title: "Lembar Pengesahan KP",
      text: "Laporan Tambahan tugas KP final yang sudah disetujui oleh dosen pembimbing KP.",
    },
  ];

  const handleSubmit = (): void => {
    setShowConfirmation(true);
  };

  const handleConfirm = (): void => {
    // Handle the actual submission here
    setShowConfirmation(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Validasi Diseminasi Kerja Praktik
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {documents.map((doc, index) => (
            <Upload key={index} title={doc.title} text={doc.text} />
          ))}

          <div className="mt-4">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "50%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Progress File • 7 of 7
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
      <ModalConfirm
        text="Anda yakin akan melakukan pengiriman"
        confirm="Yakin"
        cancel="Tidak"
        isOpen={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirmation(false)}
      />
    </div>
  );
};
