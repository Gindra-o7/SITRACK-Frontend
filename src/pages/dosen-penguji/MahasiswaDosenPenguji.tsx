import Layout from "@/components/role/Layout";
import { sidebarDosenPengujiItems } from "@/components/SidebarItems";
import MahasiswaDosenPenguji from "@/components/role/dosen-penguji/MahasiswaDosenPenguji"

const MahasiswaDosenPengujiPages = () => {

    return (
        <div>
            <Layout
                sidebarItems={sidebarDosenPengujiItems}
                subpageTitle="Mahasiswa"
            >
                <MahasiswaDosenPenguji />
            </Layout>
        </div>
    );
};

export default MahasiswaDosenPengujiPages;