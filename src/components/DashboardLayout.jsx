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
    Settings,
    ClipboardList
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
            path: "/koordinator/users",
            icon: <Users className="w-5 h-5"/>,
        },
        {
            title: "Pengaturan",
            path: "/koordinator/settings",
            icon: <Settings className="w-5 h-5"/>,
        },
    ],
    dosen: [
        {
            title: "Dashboard",
            path: "/dosen/dashboard",
            icon: <LayoutDashboard className="w-5 h-5"/>,
        },
        {
            title: "Daftar Mahasiswa",
            path: "/dosen/mahasiswa",
            icon: <ClipboardList className="w-5 h-5"/>,
        },
        {
            title: "Riwayat Bimbingan",
            path: "/dosen/riwayat",
            icon: <FileCheck2 className="w-5 h-5"/>,
        },
    ]
};

const pageTitles = {
    mahasiswa: {
        "/mahasiswa/dashboard": "Dashboard",
        "/mahasiswa/persyaratan": "Persyaratan",
        "/mahasiswa/pendaftaran": "Pendaftaran",
        "/mahasiswa/pasca-seminar": "Pasca Seminar",
        "/mahasiswa/status": "Status",
    },
    koordinator: {
        "/koordinator/dashboard": "Dashboard",
        "/koordinator/users": "Manajemen User",
        "/koordinator/settings": "Pengaturan",
    },
    dosen: {
        "/dosen/dashboard": "Dashboard",
        "/dosen/mahasiswa": "Daftar Mahasiswa",
        "/dosen/riwayat": "Riwayat Bimbingan",
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
