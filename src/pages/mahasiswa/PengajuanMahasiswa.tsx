import React from "react";
import { Spinner } from "flowbite-react";
import Layout from "../../components/role/Layout";
import { sidebarMahasiswaItems } from "../../components/SidebarItems";
import PengajuanMahasiswa from "../../components/role/mahasiswa/PengajuanMahasiswa";
import { LoadingPengajuanMahasiswa } from "../LoadingInterface";

const PengajuanMahasiswaPages = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 detik itu cuman simulasi
  }, []);

  return (
    <div>
      <Layout sidebarItems={sidebarMahasiswaItems} subpageTitle="Pengajuan">
        {isLoading ? (
          <div className="relative w-full h-full bg-gray-100">
            {/* Skeleton Background */}
            <LoadingPengajuanMahasiswa />

            {/* Spinner dan Teks di Tengah */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <Spinner size="xl" color="gray" />
              <p className="text-gray-600 font-medium">
                Loading, mohon tunggu...
              </p>
            </div>
          </div>
        ) : (
          <PengajuanMahasiswa />
        )}
      </Layout>
    </div>
  );
};

export default PengajuanMahasiswaPages;
