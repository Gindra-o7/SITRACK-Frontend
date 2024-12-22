import {createBrowserRouter} from "react-router-dom";
import LandingPages from "../pages/Landing.Pages";
import Forbidden from "../components/Forbidden";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./protected.routers";
import {AuthPage} from "../pages/Auth.Pages.tsx";
import DashboardMahasiswaPages from "../pages/mahasiswa/DashboardMahasiswa.tsx";
import PengajuanMahasiswaPages from "../pages/mahasiswa/PengajuanKoordinator.tsx";
import DashboardDosenPengujiPages from "../pages/dosen-penguji/DashboardDosenPenguji";
import MahasiswaDosenPengujiPages from "../pages/dosen-penguji/MahasiswaDosenPenguji";
import DashboardDosenPembimbingPages from "../pages/dosen-pembimbing/DashboardDosenPembimbing";
import RiwayatDosenPembimbingPages from "../pages/dosen-pembimbing/RiwayatDosenPembimbing";
import DashboardKoordinatorPages from "../pages/koordinator/DashboardKoordinator.tsx";
import ValidasiKoordinatorPages from "../pages/koordinator/ValidasiKoordinator.tsx";
import ManageAkunKoordinatorPages from "../pages/koordinator/ManageAccountsKoordinator.tsx";
import PenjadwalanKoordinatorPages from "../pages/koordinator/JadwalNilaiKoordinator.tsx";
import VisualDataKaprodiPages from "../pages/kaprodi/DashboardKaprodi.tsx"
import DashboardPembimbingInstansiPages from "../pages/instansi/DashboardPembimbingInstansi.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPages/>,
    },
    {
        path: "/unauthorized",
        element: <Forbidden/>,
    },
    {
        path: "*",
        element: <NotFound/>,
    },
    {
        path: "/auth",
        children: [
            {
                index: true,
                element: <AuthPage/>,
            },
            {
                path: "login",
                element: <AuthPage/>,
            },
            {
                path: "register",
                element: <AuthPage/>,
            },
            {
                path: "forgot-password",
                element: <AuthPage/>,
            },
        ],
    },

    //Route role mahasiswa
    {
        path: "/mahasiswa",
        element: (
                <DashboardMahasiswaPages/>
        ),
    }, {
        path: "/mahasiswa/pengajuan",
        element: (

                <PengajuanMahasiswaPages/>

        ),
    },

    // Route role dosen pembimbing
    {
        path: "/dosen-pembimbing",
        element: (

                <DashboardDosenPembimbingPages/>

        ),
    },
    {
        path: "/dosen-pembimbing/riwayat",
        element: (

                <RiwayatDosenPembimbingPages/>

        ),
    },

    // Route role dosen penguji
    {
        path: "/dosen-penguji",
        element: (

                <DashboardDosenPengujiPages/>

        ),
    }, {
        path: "/dosen-penguji/mahasiswa-seminar",
        element: (

                <MahasiswaDosenPengujiPages/>

        ),
    },

    // Route role koordinator
    // {
    //   path: "/koordinator",
    //   element: (
    //       <ProtectedRoute allowedRoles={["koordinator"]}>
    //         <DashboardKoordinatorPages />
    //       </ProtectedRoute>
    //   ),
    // },{
    //   path: "/koordinator/validasi",
    //   element: (
    //       <ProtectedRoute allowedRoles={["koordinator"]}>
    //         <ValidasiKoordinatorPages />
    //       </ProtectedRoute>
    //   ),
    // },{
    //   path: "/koordinator/penjadwalan",
    //   element: (
    //       <ProtectedRoute allowedRoles={["koordinator"]}>
    //         <PenjadwalanKoordinatorPages />
    //       </ProtectedRoute>
    //   ),
    // },{
    //   path: "/koordinator/manage-account",
    //   element: (
    //       <ProtectedRoute allowedRoles={["koordinator"]}>
    //         <ManageAkunKoordinatorPages />
    //       </ProtectedRoute>
    //   ),
    // },
    {
        path: "/koordinator",
        element: (
            <DashboardKoordinatorPages/>
        ),
    }, {
        path: "/koordinator/validasi",
        element: (
            <ValidasiKoordinatorPages/>
        ),
    }, {
        path: "/koordinator/penjadwalan",
        element: (
            <PenjadwalanKoordinatorPages/>
        ),
    }, {
        path: "/koordinator/manage-account",
        element: (
            <ManageAkunKoordinatorPages/>
        ),
    },

    // Route role kaprodi
    {
        path: "/kaprodi",
        element: (

                <VisualDataKaprodiPages/>

        ),
    },

    // Route role pembimbing instansi
    {
        path: "/pembimbing-instansi",
        element: (

                <DashboardPembimbingInstansiPages/>

        ),
    },
]);

export default router;
