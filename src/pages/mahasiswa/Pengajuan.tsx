import Layout from "@/components/role/Layout";
import { sidebarMahasiswaItems } from "@/components/SidebarItems";
import PengajuanMahasiswa from "@/components/role/mahasiswa/PengajuanMahasiswa"

const PengajuanMahasiswaPages = () => {

  return (
      <div>
        <Layout
            sidebarItems={sidebarMahasiswaItems}
            subpageTitle="Pengajuan"
        >
          <PengajuanMahasiswa />
        </Layout>
      </div>
  );
}

export default PengajuanMahasiswaPages;