import Layout from "../../components/role/Layout";
import { sidebarKoordinatorItems } from "../../components/SidebarItems";
import DashboardKoordinator from "../../components/role/koordinator/DashboardKoordinator";

const DashboardKoordinatorPages = () => {

  return (
      <div>
        <Layout
            sidebarItems={sidebarKoordinatorItems}
            subpageTitle="Dashboard"
        >
          <DashboardKoordinator />
        </Layout>
      </div>
  );
};

export default DashboardKoordinatorPages;
