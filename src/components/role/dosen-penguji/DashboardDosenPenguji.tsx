import React, {useEffect, useState} from "react";
import { Card, CardData } from "../../Card";
import Alert, { AlertData } from "../../Alert";
import { PenLine, History } from "lucide-react";
import axiosInstance from "../../../configs/axios.configs.ts";

interface UserData {
  nama: string;
  email: string;
  userRoles: {
    role: {
      name: string;
    };
  }[];
  dosen: {
    id: string | number;
  };
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const cards: CardData[] = [
    {
      title: "Penilaian Seminar",
      description:
        "Berikan penilaian untuk mahasiswa yang telah melaksanakan seminar kerja praktik.",
      path: "/dosen-penguji/mahasiswa-seminar",
      icon: PenLine,
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('/dosen-penguji/me');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const alert: AlertData = {
    description: "Anda memiliki 3 mahasiswa yang harus dinilai",
  };

  return (
    <div className="flex">
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">
              Selamat Datang, {user?.nama || 'Loading...'}
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
