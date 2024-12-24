import React from "react";
import { Spinner } from "flowbite-react";
import Layout from "../../components/role/Layout";
import { sidebarDosenPengujiItems } from "../../components/SidebarItems";
import DashboardDosenPenguji from "../../components/role/dosen-penguji/DashboardDosenPenguji";
import { LoadingDashboard } from "../LoadingInterface";

const DashboardDosenPengujiPages = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 detik itu cuman simulasi
  }, []);

  return (
    <div>
      <Layout sidebarItems={sidebarDosenPengujiItems} subpageTitle="Dashboard">
        {isLoading ? (
          <div className="relative w-full h-full bg-gray-100">
            {/* Skeleton Background */}
            <LoadingDashboard
              cardCount={1}
              showAlert={true}
              cardSize="compact"
            />
            {/* Spinner dan Teks di Tengah */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <Spinner size="xl" color="gray" />
              <p className="text-gray-600 font-medium">
                Loading, mohon tunggu...
              </p>
            </div>
          </div>
        ) : (
          <DashboardDosenPenguji />
        )}
      </Layout>
    </div>
  );
};

export default DashboardDosenPengujiPages;
