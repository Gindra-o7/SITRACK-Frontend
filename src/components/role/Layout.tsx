import {useState, useEffect, ReactNode} from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Menu, X, User } from "lucide-react";
import Logout from "../modal/Logout";
import Profile from "../modal/Profile";

export interface LayoutProps {
  children: ReactNode;
  sidebarItems: Array<{
    icon: ReactNode;
    label: string;
    link: string;
  }>;
  subpageTitle?: string;
}

const Layout = ({ children, sidebarItems, subpageTitle }: LayoutProps) => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Modify state initialization to check screen size
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // On desktop, keep sidebar open by default
    return window.innerWidth >= 1024; // lg breakpoint in Tailwind
  });

  // Add effect to handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      // On desktop (lg and above), keep sidebar open
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        // On mobile, reset to closed state
        setIsSidebarOpen(false);
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    // Only allow manual toggle on mobile
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  // Handler for saving profile data
  const handleProfileSave = (data: {
    name: string;
    email: string;
    phone: string;
  }) => {
    // TODO: Implement actual save logic (e.g., API call)
    console.log("Saving profile data:", data);
    setShowProfileModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 relative">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between h-16 px-4
        bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <div className="flex items-center gap-2">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="mr-2 lg:hidden"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            {subpageTitle}
          </h1>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`
      fixed top-16 bottom-0 left-0 z-20 
      bg-white dark:bg-gray-800 
      border-r border-gray-200 dark:border-gray-700
      overflow-hidden
      transition-all duration-500 ease-in-out
      ${isSidebarOpen ? "w-64" : "lg:w-16 w-0"}
      ${isSidebarOpen ? "translate-x-0" : "lg:translate-x-0 -translate-x-full"}
    `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Content */}
          <div className="flex-grow overflow-y-auto px-3 py-4">
            <ul className="space-y-2 font-medium">
              {sidebarItems.map((item, index) => {
                const isActive =
                  location.pathname === item.link ||
                  (location.pathname ===
                    "/dosen-dosen-penguji/mahasiswa/setoran" &&
                    item.label === "Mahasiswa");

                return (
                  <li key={index}>
                    <Link
                      to={item.link}
                      className={`flex items-center p-2 rounded-lg group relative
                        ${
                          isActive
                            ? "text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-700"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }
                        ${!isSidebarOpen ? "lg:justify-center" : ""}`}
                    >
                      {/* Penanda Aktif */}
                      {isActive && (
                        <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-900 dark:bg-gray-300 rounded-r" />
                      )}

                      {/* Sidebar Icon */}
                      <div className="w-6 h-6 flex items-center justify-center">
                        {item.icon}
                      </div>

                      {/* Sidebar Label */}
                      <span
                        className={`flex-1 ms-3 whitespace-nowrap transition-all duration-300
                    ${
                      !isSidebarOpen
                        ? "lg:w-0 lg:overflow-hidden lg:opacity-0"
                        : "w-auto opacity-100"
                    }`}
                      >
                        {item.label}
                      </span>

                      {/* Tooltip for Collapsed Sidebar */}
                      {!isSidebarOpen && (
                        <div className="absolute left-full ml-6 py-1 px-2 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.label}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Logout Button */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 space-y-2">
            <button
              onClick={() => setShowModal(true)}
              className={`flex items-center p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 w-full ${
                isSidebarOpen ? "justify-start" : "justify-center"
              }`}
              aria-label="Logout"
            >
              {/* Icon Logout */}
              <LogOut
                className={`h-5 w-5 transition-transform duration-500 ease-in-out ${
                  isSidebarOpen ? "translate-x-0" : "translate-x-0"
                }`}
              />
              {/* Label Logout */}
              <span
                className={`font-medium ms-3 whitespace-nowrap transition-all duration-500 ease-in-out ${
                  isSidebarOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-[-20px]"
                }`}
              >
                Logout
              </span>
            </button>
            <button
              onClick={() => setShowProfileModal(true)}
              className={`flex items-center p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 w-full ${
                isSidebarOpen ? "justify-start" : "justify-center"
              }`}
              aria-label="Profile"
            >
              <User
                className={`h-5 w-5 transition-transform duration-500 ease-in-out ${
                  isSidebarOpen ? "translate-x-0" : "translate-x-0"
                }`}
              />
              <span
                className={`font-medium ms-3 whitespace-nowrap transition-all duration-500 ease-in-out ${
                  isSidebarOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-[-20px]"
                }`}
              >
                Profile
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 flex-1 ${
          isSidebarOpen ? "lg:ml-64" : "ml-0 lg:ml-20"
        }`}
      >
        <main className="p-8 mt-16">{children}</main>
      </div>

      {/* Logout Modal */}
      {showModal && (
        <Logout isOpen={showModal} onClose={() => setShowModal(false)} />
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <Profile 
          isOpen={showProfileModal} 
          onClose={() => setShowProfileModal(false)}
          onSave={handleProfileSave}
          userData={{
            // Placeholder data - replace with actual user data from context/state
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+62 812 3456 7890"
          }}
        />
      )}

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-10 bg-black/50 lg:hidden"
        />
      )}
    </div>
  );
};

export default Layout;
