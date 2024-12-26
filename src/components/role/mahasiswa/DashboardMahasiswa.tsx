import React from "react";
import { Card, CardStat, CardData } from "../../Card";
import { FileUp, BadgeInfo } from "lucide-react";
import Alert, { AlertData } from "../../Alert";

const DashboardMahasiswa: React.FC = () => {
  const cards: CardData[] = [
    {
      title: "Upload Kebutuhan Dokumen Seminar",
      description:
        "Silahkan ajukan dokumen untuk validasi kelengkapan pendaftaran seminar kerja praktik Anda",
      path: "/mahasiswa/pengajuan",
      icon: FileUp,
    },
  ];

  const stats = [
    {
      title: "ALUR SELESAI",
      value: "2/3",
      description: "Pendaftaran Seminar KP",
    },
    { title: "PERIODE", value: "2023-2024", description: "Ganjil" },
    { title: "SISA WAKTU", value: "20 Hari", description: "Periode ini" },
  ];

  const alert: AlertData = {
    description: "Anda memiliki 3 berkas persyaratan yang harus direvisi",
  };

  return (
    <div className="flex  min-h-screen">
      <div className="flex-1 overflow-auto">
        <main>
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Halo, Gilang Ramadhan Indra</h2>
            <p className="text-gray-500 text-lg">
              Ingin melakukan apa hari ini?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <CardStat
                key={index}
                variant="detailed"
                title={stat.title}
                value={stat.value}
                description={stat.description}
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

export default DashboardMahasiswa;
