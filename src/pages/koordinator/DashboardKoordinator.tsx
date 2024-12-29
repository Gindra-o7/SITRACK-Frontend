import React from "react";
import { Spinner } from "flowbite-react";
import Layout from "../../components/role/Layout";
import { sidebarKoordinatorItems } from "../../components/SidebarItems";
import DashboardKoordinator from "../../components/role/koordinator/DashboardKoordinator";
import { LoadingDashboard } from "../LoadingInterface";

const DashboardKoordinatorPages = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <Layout sidebarItems={sidebarKoordinatorItems} subpageTitle="Dashboard">
        {isLoading ? (
          <div className="relative w-full h-full bg-gray-100">
            {/* Skeleton Background */}
            <LoadingDashboard
              cardCount={3}
              showAlert={true}
              statsCount={4}
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
          <DashboardKoordinator />
        )}
      </Layout>
    </div>
  );
};

export default DashboardKoordinatorPages;
