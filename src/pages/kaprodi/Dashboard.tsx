import Layout from "../../components/role/Layout";
import { sidebarKaprodiItems } from "../../components/SidebarItems";
import VisualDataKaprodi from "../../components/role/kaprodi/VisualDataKaprodi"

const MahasiswaDosenPengujiPages = () => {

  return (
      <div>
        <Layout
            sidebarItems={sidebarKaprodiItems}
            subpageTitle="Visualisasi Data"
        >
          <VisualDataKaprodi />
        </Layout>
      </div>
  );
};

export default MahasiswaDosenPengujiPages;