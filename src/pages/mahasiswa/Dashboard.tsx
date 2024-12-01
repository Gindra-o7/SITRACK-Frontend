import React from "react";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import { FileUp, LucideIcon, BadgeInfo } from "lucide-react";

type CardData = {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
};

const Dashboard: React.FC = () => {
  const cards: CardData[] = [
    {
      title: "Upload Kebutuhan Dokumen Seminar",
      description:
        "Silahkan ajukan dokumen untuk validasi kelengkapan pendaftaran seminar kerja praktik Anda",
      path: "/mahasiswa/pengajuan",
      icon: FileUp,
    },
    {
      title: "Status Seminar KP",
      description:
        "Pantau status unggahan berkas persyaratan, pendaftaran, dan berkas pasca-seminar kerja praktik Anda",
      path: "/mahasiswa/status",
      icon: BadgeInfo,
    },
  ];

  return (
    <div className="flex">
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Halo, Gilang Ramadhan Indra</h2>
            <p className="text-gray-500 text-lg">
              Ingin melakukan apa hari ini?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <Link to={card.path} key={index}>
                <Card
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                />
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
