import Layout from "@/components/role/Layout";
import { sidebarDosenPembimbingItems } from "@/components/SidebarItems";
import DashboardDosenPembimbing from "@/components/role/dosen-pembimbing/DashboardDosenPembimbing";

const DashboardDosenPembimbingPages = () => {

  return (
      <div>
        <Layout
            sidebarItems={sidebarDosenPembimbingItems}
            subpageTitle="Mahasiswa"
        >
          <DashboardDosenPembimbing />
        </Layout>
      </div>
  );
};

export default DashboardDosenPembimbingPages;
