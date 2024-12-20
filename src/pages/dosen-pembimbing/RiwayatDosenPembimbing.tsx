import Layout from "../../components/role/Layout";
import { sidebarDosenPembimbingItems } from "../../components/SidebarItems";
import RiwayatDosenPembimbing from "../../components/role/dosen-pembimbing/RiwayatDosenPembimbing";

const RiwayatDosenPembimbingPages = () => {

    return (
        <div>
            <Layout
                sidebarItems={sidebarDosenPembimbingItems}
                subpageTitle="Riwayat"
            >
                <RiwayatDosenPembimbing />
            </Layout>
        </div>
    );
};

export default RiwayatDosenPembimbingPages;
