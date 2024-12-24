import React from "react";
import { Spinner } from "flowbite-react";
import Layout from "../../components/role/Layout";
import { sidebarKoordinatorItems } from "../../components/SidebarItems";
import PenjadwalanKoordinator from "../../components/role/koordinator/PenjadwalanKoordinator";
import { LoadingPenjadwalanKoordinator } from "../LoadingInterface";

const PenjadwalanKoordinatorPages = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 detik itu cuman simulasi
  }, []);

  return (
    <Layout
      sidebarItems={sidebarKoordinatorItems}
      subpageTitle="Jadwal & Nilai"
    >
      {isLoading ? (
        <div className="relative w-full h-full bg-gray-100">
          {/* Skeleton Background */}
          <LoadingPenjadwalanKoordinator />

          {/* Spinner dan Teks di Tengah */}
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
            <Spinner size="xl" color="gray" />
            <p className="text-gray-600 font-medium">
              Loading, mohon tunggu...
            </p>
          </div>
        </div>
      ) : (
        <PenjadwalanKoordinator />
      )}
    </Layout>
  );
};

export default PenjadwalanKoordinatorPages;
