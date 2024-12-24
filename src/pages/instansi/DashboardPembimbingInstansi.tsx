import React from "react";
import { Spinner } from "flowbite-react";
import Layout from "../../components/role/Layout";
import { sidebarPembimbingInstansiItems } from "../../components/SidebarItems";
import MahasiswaDosenPenguji from "../../components/role/pembimbing-instansi/DashboardPembimbingInstansi";
// import DashboardPembimbingInstansi from "../../components/role/pembimbing-instansi/DashboardPembimbingInstansi";
import { LoadingDashboardPembimbingInstansi } from "../LoadingInterface";

const MahasiswaPembimbingInstansiPages = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 detik itu cuman simulasi
  }, []);

  return (
    <div>
      <Layout
        sidebarItems={sidebarPembimbingInstansiItems}
        subpageTitle="Mahasiswa"
      >
        {isLoading ? (
          <div className="relative w-full h-full bg-gray-100">
            {/* Skeleton Background */}
            <LoadingDashboardPembimbingInstansi />
            {/* Spinner dan Teks di Tengah */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <Spinner size="xl" color="gray" />
              <p className="text-gray-600 font-medium">
                Loading, mohon tunggu...
              </p>
            </div>
          </div>
        ) : (
          <MahasiswaDosenPenguji />
        )}
      </Layout>
    </div>
  );
};

export default MahasiswaPembimbingInstansiPages;
