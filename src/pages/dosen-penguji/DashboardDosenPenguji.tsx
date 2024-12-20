import Layout from "../../components/role/Layout";
import { sidebarDosenPengujiItems } from "../../components/SidebarItems";
import DashboardDosenPenguji from "../../components/role/dosen-penguji/DashboardDosenPenguji"

const DashboardDosenPengujiPages = () => {

  return (
      <div>
        <Layout
            sidebarItems={sidebarDosenPengujiItems}
            subpageTitle="Dashboard"
        >
          <DashboardDosenPenguji />
        </Layout>
      </div>
  );
};

export default DashboardDosenPengujiPages;
