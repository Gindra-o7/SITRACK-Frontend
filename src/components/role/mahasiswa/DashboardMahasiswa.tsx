import React, {useEffect, useState} from "react";
import { Card, CardStat, CardData } from "../../Card";
import { FileUp, Calendar } from "lucide-react";
import Alert, { AlertData } from "../../Alert";
import axiosInstance from "../../../configs/axios.configs.ts";

interface UserData {
  id: string;
  nama: string;
  email: string;
  userRoles: {
    role: {
      name: string;
    };
  }[];
}

interface DashboardResponse {
  currentStage: 'PERSYARATAN' | 'PENDAFTARAN' | 'PASCA_SEMINAR';
  documentsNeedingRevision: number;
  seminarSchedule: {
    id: string;
    tanggal: Date;
    waktuMulai: Date;
    waktuSelesai: Date;
    ruangan: string;
    status: string;
    dosenPenguji: {
      nama: string;
      nip: string;
    };
  } | null;
  completedSteps: number;
  totalSteps: number;
}

const DashboardMahasiswa: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const cards: CardData[] = [
    {
      title: "Upload Kebutuhan Dokumen Seminar",
      description:
          "Silahkan ajukan dokumen untuk validasi kelengkapan pendaftaran seminar kerja praktik Anda",
      path: "/mahasiswa/pengajuan",
      icon: FileUp,
    },
  ];

  if (dashboardData?.seminarSchedule) {
    cards.push({
      title: "Jadwal Seminar",
      description: (
          <>
            <div>Tanggal: {formatDate(dashboardData.seminarSchedule.tanggal)}</div>
            <div>Ruangan: {dashboardData.seminarSchedule.ruangan}</div>
            <div>Dosen Penguji: {dashboardData.seminarSchedule.dosenPenguji.nama}</div>
          </>
      ),
      icon: Calendar,
    });
  }

  const stats = [
    {
      title: "ALUR SELESAI",
      value: dashboardData ? `${dashboardData.completedSteps}/${dashboardData.totalSteps}` : "0/3",
      description: `Tahap: ${dashboardData?.currentStage.replace('_', ' ') || 'Loading...'}`,
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axiosInstance.get('/mahasiswa/me');
        setUser(userResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) return;

      try {
        const dashboardResponse = await axiosInstance.get(`/mahasiswa/dashboard/${user.id}`);
        setDashboardData(dashboardResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [user?.id]);

  const alertData: AlertData | null = dashboardData?.documentsNeedingRevision ? {
    description: `Anda memiliki ${dashboardData.documentsNeedingRevision} berkas persyaratan yang harus direvisi`
  } : null;

  return (
      <div className="flex bg-gray-50">
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold">Halo, {user?.nama || 'Loading...'}</h2>
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

            {alertData && <Alert description={alertData.description} />}

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