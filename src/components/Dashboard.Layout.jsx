import {useState} from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {Outlet, useLocation, Navigate} from "react-router-dom";
import {
    LayoutDashboard,
    FileInput,
    FileSearch,
    BadgeCheck,
    FileCheck2,
    Users,
    ClipboardList,
    GraduationCap,
    BellPlus,
    Calculator,
    Search,
    FileUp
} from "lucide-react";

const menuConfigs = {
    mahasiswa: [
        {
            title: "Dashboard",
            path: "/mahasiswa/dashboard",
            icon: <LayoutDashboard className="w-5 h-5"/>,
        },
        {
            title: "Persyaratan",
            path: "/mahasiswa/persyaratan",
            icon: <FileSearch className="w-5 h-5"/>,
        },
        {
            title: "Pendaftaran",
            path: "/mahasiswa/pendaftaran",
            icon: <FileInput className="w-5 h-5"/>,
        },
        {
            title: "Pasca Seminar",
            path: "/mahasiswa/pasca-seminar",
            icon: <FileCheck2 className="w-5 h-5"/>,
        },
        {
            title: "Upload Dokumen",
            path: "/mahasiswa/upload",
            icon: <FileUp className="w-5 h-5"/>,
        },
        {
            title: "Status",
            path: "/mahasiswa/status",
            icon: <BadgeCheck className="w-5 h-5"/>,
        },
    ],
    koordinator: [
        {
            title: "Dashboard",
            path: "/koordinator/dashboard",
            icon: <LayoutDashboard className="w-5 h-5"/>,
        },
        {
            title: "Manajemen User",
            path: "/koordinator/manage-akun",
            icon: <Users className="w-5 h-5"/>,
        },
        {
            title: "Validasi Dokumen",
            path: "/koordinator/validasi",
            icon: <FileSearch className="w-5 h-5"/>,
        },
        {
            title: "Penilaian Seminar",
            path: "/koordinator/nilai-seminar",
            icon: <Calculator className="w-5 h-5"/>,
        },
        {
            title: "Notifikasi",
            path: "/koordinator/notifikasi",
            icon: <BellPlus className="w-5 h-5"/>,
        },
    ],
    dosen: [
        {
            title: "Dashboard",
            path: "/dosen/dashboard",
            icon: <LayoutDashboard className="w-5 h-5"/>,
        },
        {
            title: "Mahasiswa Bimbingan",
            path: "/dosen/mahasiswa-bimbingan",
            icon: <ClipboardList className="w-5 h-5"/>,
        },
        {
            title: "Mahasiswa Seminar",
            path: "/dosen/mahasiswa-seminar",
            icon: <GraduationCap className="w-5 h-5"/>,
        }
    ]
};

const pageTitles = {
    mahasiswa: {
        "/mahasiswa/dashboard": "Dashboard",
        "/mahasiswa/persyaratan": "Persyaratan",
        "/mahasiswa/pendaftaran": "Pendaftaran",
        "/mahasiswa/pasca-seminar": "Pasca Seminar",
        "/mahasiswa/upload": "Upload Dokumen",
        "/mahasiswa/status": "Status",
    },
    koordinator: {
        "/koordinator/dashboard": "Dashboard",
        "/koordinator/manage-akun": "Manajemen User",
        "/koordinator/validasi": "Validasi Dokumen",
        "/koordinator/nilai-seminar": "Nilai Seminar Mahasiswa",
        "/koordinator/notifikasi": "Notifikasi",
    },
    dosen: {
        "/dosen/dashboard": "Dashboard",
        "/dosen/mahasiswa-bimbingan": "Mahasiswa Bimbingan",
        "/dosen/mahasiswa-seminar": "Mahasiswa Seminar"
    },
    kaprodi: {
        "/kaprodi/dashboard": "Dashboard",
        "/kaprodi/visualisasi": "Visualisasi Data",
    }
};

const DashboardLayout = ({ role, userData }) => {

    if (!role || !menuConfigs[role]) {
        console.error("Invalid role provided to DashboardLayout:", role);
        return <Navigate to="/login" replace />;
    }

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const getPageTitle = () => {
        const titles = pageTitles[role];
        return titles[location.pathname] || "SITRACK";
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 relative">
            <Navbar title={getPageTitle()} onToggleSidebar={toggleSidebar}/>
            <div className="flex">
                <Sidebar
                    isOpen={isSidebarOpen}
                    menuItems={menuConfigs[role]}
                    userData={userData}
                    role={role}
                />
                <div
                    className={`transition-all duration-300 flex-1 ${
                        isSidebarOpen
                            ? 'lg:ml-64'
                            : 'ml-0 lg:ml-20'
                    }`}
                >
                    <main className="p-8 mt-16">
                        <Outlet/>
                    </main>
                </div>

                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-10 bg-gray-900/50 lg:hidden"
                        onClick={toggleSidebar}
                    />
                )}
            </div>
        </div>
    );
};

export default DashboardLayout;
