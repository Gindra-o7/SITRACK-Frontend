import Layout from "../../components/role/Layout";
import { sidebarKoordinatorItems } from "../../components/SidebarItems";
import PenjadwalanKoordinator from "../../components/role/koordinator/PenjadwalanKoordinator";

const PenjadwalanKoordinatorPages = () => {
  return (
      <Layout
          sidebarItems={sidebarKoordinatorItems}
          subpageTitle="Jadwal & Nilai"
      >
        <PenjadwalanKoordinator />
      </Layout>
  );
};

export default PenjadwalanKoordinatorPages;