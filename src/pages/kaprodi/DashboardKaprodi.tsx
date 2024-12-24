import React from "react";
import { Spinner } from "flowbite-react";
import Layout from "../../components/role/Layout";
import { sidebarKaprodiItems } from "../../components/SidebarItems";
import VisualDataKaprodi from "../../components/role/kaprodi/VisualDataKaprodi";
import { LoadingDashboardKaprodi } from "../LoadingInterface";

const MahasiswaDosenPengujiPages = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 detik itu cuman simulasi
  }, []);

  return (
    <div>
      <Layout
        sidebarItems={sidebarKaprodiItems}
        subpageTitle="Visualisasi Data"
      >
        {isLoading ? (
          <div className="relative w-full h-full bg-gray-100">
            {/* Skeleton Background */}
            <LoadingDashboardKaprodi />
            {/* Spinner dan Teks di Tengah */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <Spinner size="xl" color="gray" />
              <p className="text-gray-600 font-medium">
                Loading, mohon tunggu...
              </p>
            </div>
          </div>
        ) : (
          <VisualDataKaprodi />
        )}
      </Layout>
    </div>
  );
};

export default MahasiswaDosenPengujiPages;
