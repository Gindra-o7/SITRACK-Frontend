import Layout from "../../components/role/Layout";
import { sidebarKoordinatorItems } from "../../components/SidebarItems";
import DashboardKoordinator from "../../components/role/koordinator/DashboardKoordinator";

const DashboardKoordinatorPages = () => {
  return (
      <Layout sidebarItems={sidebarKoordinatorItems} subpageTitle="Dashboard">
        <DashboardKoordinator />
      </Layout>
  );
};

export default DashboardKoordinatorPages;