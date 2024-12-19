import React from "react";
import { CardStat, Card, CardData } from "../../Card";
import Alert, { AlertData } from "../../Alert";
import { Users, FileCheck, UserCog } from "lucide-react";

const Dashboard: React.FC = () => {
  const cards: CardData[] = [
    {
      title: "Manajemen User",
      description:
        "Kelola akun mahasiswa, dosen, pembimbing instansi, dan kaprodi dalam sistem.",
      path: "/koordinator/manage-account",
      icon: UserCog,
    },
    {
      title: "Validasi Berkas",
      description:
        "Periksa dan validasi berkas pengajuan kerja praktik dari mahasiswa.",
      path: "/koordinator/validasi",
      icon: FileCheck,
    },
    {
      title: "Jadwal dan Seminar KP",
      description:
        "Atur penunjukan dosen pembimbing dan penguji untuk mahasiswa.",
      path: "/koordinator/penjadwalan",
      icon: Users,
    },
  ];

  const stats = [
    { label: "Pengajuan Baru", value: "12" },
    { label: "Menunggu Validasi", value: "8" },
    { label: "Seminar Minggu Ini", value: "5" },
    { label: "Total Mahasiswa Aktif", value: "156" },
  ];

  const alert: AlertData = {
    description:
      "Anda memiliki 8 berkas pengajuan yang perlu divalidasi hari ini",
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Selamat Datang, Dr. Ahmad Koordinator
            </h2>
            <p className="text-gray-600 mt-1">
              Koordinator Kerja Praktik Teknik Informatika
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <CardStat
                key={index}
                variant="basic"
                label={stat.label}
                value={stat.value}
              />
            ))}
          </div>

          <Alert description={alert.description} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                path={card.path}
                icon={card.icon}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
