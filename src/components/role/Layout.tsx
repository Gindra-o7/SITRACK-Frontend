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

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return window.innerWidth >= 1024;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const handleProfileSave = (data: {
    name: string;
    email: string;
    phone: string;
  }) => {
    console.log("Saving profile data:", data);
    setShowProfileModal(false);
  };

  const handleLogoutConfirm = () => {
    console.log("Logging out...");
    setShowModal(false);
  };

  return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800 relative">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2">
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
          transition-all duration-500 ease-in-out
          ${isSidebarOpen ? "w-64" : "w-16"}
        `}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Content */}
            <div className="flex-grow overflow-hidden hover:overflow-y-auto px-3 py-4">
              <ul className="space-y-2 font-medium">
                {sidebarItems.map((item, index) => {
                  const isActive = location.pathname === item.link;

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
                        ${!isSidebarOpen ? "justify-center" : ""}`}
                        >
                          {isActive && (
                              <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-900 dark:bg-gray-300 rounded-r" />
                          )}

                          <div className="w-6 h-6 flex items-center justify-center">
                            {item.icon}
                          </div>

                          {isSidebarOpen && (
                              <span className="flex-1 ms-3 whitespace-nowrap">
                          {item.label}
                        </span>
                          )}

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

            {/* Logout and Profile Buttons */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-3 space-y-2">
              <button
                  onClick={() => setShowProfileModal(true)}
                  className={`flex items-center p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 w-full
                ${!isSidebarOpen ? "justify-center pl-2" : "justify-start"}
              `}
                  aria-label="Profile"
              >
                <User className="h-5 w-5 min-w-5" />
                {isSidebarOpen && (
                    <span className="font-medium ms-3 whitespace-nowrap">
                  Profile
                </span>
                )}
              </button>
              <button
                  onClick={() => setShowModal(true)}
                  className={`flex items-center p-2 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 w-full
                ${!isSidebarOpen ? "justify-center pl-2" : "justify-start"}
              `}
                  aria-label="Logout"
              >
                <LogOut className="h-5 w-5 min-w-5" />
                {isSidebarOpen && (
                    <span className="font-medium ms-3 whitespace-nowrap">
                  Logout
                </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div
            className={`transition-all duration-300 flex-1 ${
                isSidebarOpen ? "lg:ml-64" : "ml-16"
            }`}
        >
          <main className="p-8 mt-16">{children}</main>
        </div>

        {/* Modals */}
        {showModal && (
            <Logout
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleLogoutConfirm}
            />
        )}

        {showProfileModal && (
            <Profile
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                onSave={handleProfileSave}
                userData={{
                  name: "John Doe",
                  email: "john.doe@example.com",
                  phone: "+62 812 3456 7890"
                }}
            />
        )}

        {/* Mobile Overlay */}
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