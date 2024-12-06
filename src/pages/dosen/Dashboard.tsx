import React from "react";
import Card, { CardData } from "../../components/Card";
import Alert, { AlertData } from "../../components/Alert";
import { Link } from "react-router-dom";
import { PenLine, History } from "lucide-react";

const Dashboard: React.FC = () => {
  const cards: CardData[] = [
    {
      title: "Penilaian Seminar",
      description:
        "Berikan penilaian untuk mahasiswa yang telah melaksanakan seminar kerja praktik.",
      path: "/dosen/mahasiswa-seminar",
      icon: PenLine,
    },
    {
      title: "Mahasiswa Bimbingan",
      description:
        "Lihat daftar mahasiswa yang pernah dan sedang Anda bimbing dalam kerja praktik.",
      path: "/dosen/mahasiswa-bimbingan",
      icon: PenLine,
    },
    {
      title: "Riwayat Bimbingan",
      description:
        "Lihat daftar mahasiswa yang pernah dan sedang Anda bimbing dalam kerja praktik.",
      path: "/dosen/riwayat",
      icon: History,
    },
  ];

  const alert: AlertData = {
    description: "Anda memiliki 3 mahasiswa yang harus dinilai",
  };

  return (
    <div className="flex">
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">
              Selamat Datang, Dr. Budi Santoso, M.Kom
            </h2>
            <p className="text-gray-500 text-lg">
              Ingin melakukan apa hari ini?
            </p>
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
