import {Spinner} from "flowbite-react"
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {LoadingInterfaceLanding} from "@/pages/LoadingInterface";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Flow from "../components/landing/Flow";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";
import axiosInstance from "@/configs/axios.configs";
import Wave from "../components/landing/Wave";
import {useAuth} from "@/contexts/auth.contexts";

const LandingPages = () => {
    const {user, login, logout} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Handle data loading atau proses tambahan setelah login
    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    // Validasi token ke backend
                    const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL_PLACEHOLDER}/validate-token`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    const userData = response.data.user;

                    // Update global state untuk auth
                    await login(userData.email, 'token_validation');
                } catch (error) {
                    console.error("Token tidak valid:", error instanceof Error ? error.message : 'Unknown error');
                    localStorage.removeItem("token");
                    localStorage.removeItem("userRole");
                    localStorage.removeItem("userEmail");
                }
            }
            setIsLoading(false);
        };

        checkToken();
    }, [login]);

    const handleLogin = () => {
        if (user) {
            logout();
        } else {
            navigate('/auth');
        }
    };

    const handleGoToDashboard = () => {
        if (!user) return;

        const dashboardRoutes: { [key: string]: string } = {
            'mahasiswa': '/mahasiswa',
            'dosen_penguji': '/dosen-penguji',
            'dosen_pembimbing': '/dosen-pembimbing',
            'koordinator': '/koordinator',
            'pembimbing_instansi': '/pembimbing-instansi',
            'kaprodi': '/kaprodi'
        };

        const route = dashboardRoutes[user.role];
        if (route) {
            navigate(route);
        } else {
            console.error("User does not have a defined role");
        }
    };

    // Render loading screen if still initializing
    if (isLoading) {
        return (
            <div className="relative w-full h-screen bg-gray-100">
                {/* Skeleton Background */}
                <LoadingInterfaceLanding/>

                {/* Spinner dan Teks di Tengah */}
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                    <Spinner size="xl" color="gray"/>
                    <p className="text-gray-600 font-medium">Loading, mohon tunggu...</p>
                </div>
            </div>
        );
    }

  return (
    <div>
      <Header
          isLogin={!!user}
          onLoginClick={handleLogin}
          onGoToDashboardClick={() => handleGoToDashboard}
      />
      <Hero />
      <Features />
      <Flow />
      <FAQ />
      <Wave />
      <Footer />
    </div>
  );
};

export default LandingPages;
