import Layout from "../../components/role/Layout";
import {sidebarKoordinatorItems} from "../../components/SidebarItems";
import ValidasiKoordinator from "../../components/role/koordinator/ValidasiKoordinator";

const ValidasiKoordinatorPages = () => {

    return (
        <div>
            <Layout
                sidebarItems={sidebarKoordinatorItems}
                subpageTitle="Validasi Dokumen Mahasiswa"
            >
                <ValidasiKoordinator/>
            </Layout>
        </div>
    );
};

export default ValidasiKoordinatorPages;
