import Layout from "@/components/role/Layout";
import { sidebarKoordinatorItems } from "@/components/SidebarItems";
import ManageAkunKoordinator from "@/components/role/koordinator/ManageAkunKoordinator";

const ManajemenAkunKoordinatorPages = () => {

  return (
      <div>
        <Layout
            sidebarItems={sidebarKoordinatorItems}
            subpageTitle="Managemen Akun"
        >
          <ManageAkunKoordinator />
        </Layout>
      </div>
  );
};

export default ManajemenAkunKoordinatorPages;