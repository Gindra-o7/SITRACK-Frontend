import Layout from "@/components/role/Layout";
import { sidebarDosenPengujiItems } from "@/components/SidebarItems";
import MahasiswaDosenPenguji from "@/components/role/pembimbing-instansi/DashboardPembimbingInstansi"

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