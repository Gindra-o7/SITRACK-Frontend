import React from "react";
import { Spinner } from "flowbite-react";
import Layout from "../../components/role/Layout";
import { sidebarMahasiswaItems } from "../../components/SidebarItems";
import DashboardMahasiswa from "../../components/role/mahasiswa/DashboardMahasiswa";
import { LoadingDashboardMahasiswa } from "../LoadingInterface";

const DashboardMahasiswaPages = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 detik itu cuman simulasi
  }, []);

  return (
    <div>
      <Layout sidebarItems={sidebarMahasiswaItems} subpageTitle="Dashboard">
        {isLoading ? (
          <div className="relative w-full h-full bg-gray-100">
            {/* Skeleton Background */}
            <LoadingDashboardMahasiswa cardCount={1} showAlert={true} />

            {/* Spinner dan Teks di Tengah */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <Spinner size="xl" color="gray" />
              <p className="text-gray-600 font-medium">
                Loading, mohon tunggu...
              </p>
            </div>
          </div>
        ) : (
          <DashboardMahasiswa />
        )}
      </Layout>
    </div>
  );
};

export default DashboardMahasiswaPages;
