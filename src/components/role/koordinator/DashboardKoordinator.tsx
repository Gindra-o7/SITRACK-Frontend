import { useEffect, useState } from "react";
import { LoadingDashboard } from "../../../pages/LoadingInterface";
import axiosInstance from "../../../configs/axios.configs";
import { UserCog, FileCheck, Users } from "lucide-react";
import { CardStat, Card } from "../../Card";
import Alert from "../../Alert";

interface UserData {
  nama: string;
  email: string;
  userRoles: {
    role: {
      name: string;
    };
  }[];
}

interface DashboardStats {
  newSubmissions: number;
  pendingValidations: number;
  seminarCount: number;
  totalStudents: number;
}

interface DashboardAlert {
  needsValidation: number;
}

interface DashboardData {
  stats: DashboardStats;
  alert: DashboardAlert;
}

const DashboardKoordinator = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userResponse, statsResponse] = await Promise.all([
          axiosInstance.get('/koordinator/me'),
          axiosInstance.get('/koordinator/stats')
        ]);

        setUser(userResponse.data);
        setDashboardData(statsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Gagal memuat data dashboard');
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = [
    {
      title: "Manajemen User",
      description: "Kelola akun mahasiswa, dosen, pembimbing instansi, dan kaprodi dalam sistem.",
      path: "/koordinator/manage-account",
      icon: UserCog,
    },
    {
      title: "Validasi Berkas",
      description: "Periksa dan validasi berkas pengajuan kerja praktik dari mahasiswa.",
      path: "/koordinator/validasi",
      icon: FileCheck,
    },
    {
      title: "Jadwal dan Seminar KP",
      description: "Atur penunjukan dosen pembimbing dan penguji untuk mahasiswa.",
      path: "/koordinator/penjadwalan",
      icon: Users,
    },
  ];

  if (loading) {
    return (
        <div className="relative w-full h-full bg-gray-100">
          <LoadingDashboard
              cardCount={3}
              showAlert={true}
              statsCount={4}
              cardSize="compact"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="text-gray-600 font-medium">Loading, mohon tunggu...</p>
          </div>
        </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
      <div className="flex bg-gray-50">
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Selamat Datang, {user?.nama || 'Loading...'}
              </h2>
              <p className="text-gray-600 mt-1">
                Koordinator Kerja Praktik Teknik Informatika
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Pengajuan Baru", value: dashboardData?.stats.newSubmissions.toString() || "0" },
                { label: "Menunggu Validasi", value: dashboardData?.stats.pendingValidations.toString() || "0" },
                { label: "Seminar Semester ini", value: dashboardData?.stats.seminarCount.toString() || "0" },
                { label: "Total Mahasiswa", value: dashboardData?.stats.totalStudents.toString() || "0" },
              ].map((stat, index) => (
                  <CardStat
                      key={index}
                      variant="basic"
                      label={stat.label}
                      value={stat.value}
                  />
              ))}
            </div>

            {dashboardData?.alert.needsValidation > 0 && (
                <Alert
                    description={`Anda memiliki ${dashboardData.alert.needsValidation} berkas pengajuan yang perlu divalidasi hari ini`}
                />
            )}

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

export default DashboardKoordinator;