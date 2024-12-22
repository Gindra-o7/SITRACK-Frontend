import Layout from "../../components/role/Layout";
import { sidebarMahasiswaItems } from "../../components/SidebarItems";
import DashboardMahasiswa from "../../components/role/mahasiswa/DashboardMahasiswa"

const DashboardMahasiswaPages = () => {

  return (
      <div>
        <Layout
            sidebarItems={sidebarMahasiswaItems}
            subpageTitle="Dashboard"
        >
          <DashboardMahasiswa />
        </Layout>
      </div>
  );
};

export default DashboardMahasiswaPages;
