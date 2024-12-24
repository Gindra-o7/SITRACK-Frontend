import React from "react";
import { Spinner } from "flowbite-react";
import Layout from "../../components/role/Layout";
import { sidebarDosenPembimbingItems } from "../../components/SidebarItems";
import RiwayatDosenPembimbing from "../../components/role/dosen-pembimbing/RiwayatDosenPembimbing";
import { LoadingRiwayatDosenPembimbing } from "../LoadingInterface";

const RiwayatDosenPembimbingPages = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 detik itu cuman simulasi
  }, []);

  return (
    <div>
      <Layout sidebarItems={sidebarDosenPembimbingItems} subpageTitle="Riwayat">
        {isLoading ? (
          <div className="relative w-full h-full bg-gray-100">
            {/* Skeleton Background */}
            <LoadingRiwayatDosenPembimbing />

            {/* Spinner dan Teks di Tengah */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <Spinner size="xl" color="gray" />
              <p className="text-gray-600 font-medium">
                Loading, mohon tunggu...
              </p>
            </div>
          </div>
        ) : (
          <RiwayatDosenPembimbing />
        )}
      </Layout>
    </div>
  );
};

export default RiwayatDosenPembimbingPages;
