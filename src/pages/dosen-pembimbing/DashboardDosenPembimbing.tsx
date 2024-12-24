import React from "react";
import { Spinner } from "flowbite-react";
import Layout from "../../components/role/Layout";
import { sidebarDosenPembimbingItems } from "../../components/SidebarItems";
import DashboardDosenPembimbing from "../../components/role/dosen-pembimbing/DashboardDosenPembimbing";
import { LoadingMahasiswaSeminar } from "../LoadingInterface";

const DashboardDosenPembimbingPages = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 detik itu cuman simulasi
  }, []);

  return (
    <div>
      <Layout
        sidebarItems={sidebarDosenPembimbingItems}
        subpageTitle="Mahasiswa"
      >
        {isLoading ? (
          <div className="relative w-full h-full bg-gray-100">
            {/* Skeleton Background */}
            <LoadingMahasiswaSeminar cardCount={9} showStats={true} />

            {/* Spinner dan Teks di Tengah */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <Spinner size="xl" color="gray" />
              <p className="text-gray-600 font-medium">
                Loading, mohon tunggu...
              </p>
            </div>
          </div>
        ) : (
          <DashboardDosenPembimbing />
        )}
      </Layout>
    </div>
  );
};

export default DashboardDosenPembimbingPages;
