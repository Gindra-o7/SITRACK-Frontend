import Layout from "../../components/role/Layout";
import { sidebarKoordinatorItems } from "../../components/SidebarItems";
import PenjadwalanKoordinator from "../../components/role/koordinator/PenjadwalanKoordinator";

const PenjadwalanKoordinatorPages = () => {

  return (
      <div>
        <Layout
            sidebarItems={sidebarKoordinatorItems}
            subpageTitle="Jadwal & Nilai"
        >
          <PenjadwalanKoordinator />
        </Layout>
      </div>
  );
};

export default PenjadwalanKoordinatorPages;