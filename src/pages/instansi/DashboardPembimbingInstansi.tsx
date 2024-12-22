import Layout from "../../components/role/Layout";
import { sidebarPembimbingInstansiItems } from "../../components/SidebarItems";
import MahasiswaDosenPenguji from "../../components/role/pembimbing-instansi/DashboardPembimbingInstansi"

const MahasiswaDosenPengujiPages = () => {

  return (
      <div>
        <Layout
            sidebarItems={sidebarPembimbingInstansiItems}
            subpageTitle="Mahasiswa"
        >
          <MahasiswaDosenPenguji />
        </Layout>
      </div>
  );
};

export default MahasiswaDosenPengujiPages;