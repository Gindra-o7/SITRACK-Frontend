import {
  LayoutDashboard,
  FileSearch,
  FileCheck,
  FileCheck2,
  BookOpen,
  Users,
  GraduationCap,
  Calculator,
  ChartArea,
} from "lucide-react";

export const sidebarMahasiswaItems = [
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "Dashboard",
    link: "/mahasiswa",
  },
  {
    icon: <FileSearch className="w-5 h-5" />,
    label: "Pengajuan",
    link: "/mahasiswa/pengajuan",
  },
];

export const sidebarDosenPembimbingItems = [
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "Dashboard",
    link: "/dosen-pembimbing",
  },
  {
    icon: <FileCheck2 className="w-5 h-5" />,
    label: "Riwayat",
    link: "/dosen-pembimbing/riwayat",
  },
];

export const sidebarDosenPengujiItems = [
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "Dashboard",
    link: "/dosen-penguji",
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    label: "Mahasiswa Seminar",
    link: "/dosen-penguji/mahasiswa-seminar",
  },
];

export const sidebarKoordinatorItems = [
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "Dashboard",
    link: "/koordinator",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Manajemen Users",
    link: "/koordinator/manage-account",
  },
  {
    icon: <FileCheck className="w-5 h-5" />,
    label: "Validasi Dokumen",
    link: "/koordinator/validasi",
  },
  {
    icon: <Calculator className="w-5 h-5" />,
    label: "Jadwal & Nilai",
    link: "/koordinator/penjadwalan",
  },
];

export const sidebarKaprodiItems = [
  {
    icon: <ChartArea className="w-5 h-5" />,
    label: "Visualisasi Data",
    link: "/kaprodi",
  },
];

export const sidebarPembimbingInstansiItems = [
  {
    icon: <BookOpen className="w-5 h-5" />,
    label: "Mahasiswa",
    link: "/pembimbing-instansi",
  },
];
