import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CircleUser, LogOut } from "lucide-react";
import Logout from "./Modal/Logout";
import Profile from "./Modal/Profile";

interface MenuItem {
    path: string;
    title: string;
    icon: React.ReactNode;
}

interface UserData {
    name?: string;
    id?: string;
    [key: string]: any; // For any additional user data properties
}

interface SidebarProps {
    isOpen: boolean;
    menuItems: MenuItem[];
    userData?: UserData;
    role?: string;
    onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
                                             isOpen,
                                             menuItems,
                                             userData,
                                             role,
                                             onToggle
                                         }) => {
    const location = useLocation();
    const [showLogout, setShowLogout] = useState<boolean>(false);
    const [showProfile, setShowProfile] = useState<boolean>(false);

    const handleLogout = (): void => {
        try {
            console.log("Logging out...");
            window.location.href = "/login";
        } catch (error) {
            console.log("Logout Failed:", error);
        }
    };

    const handleProfileSave = (updateData: Partial<UserData>): void => {
        console.log("Updating profile...", updateData);
        setShowProfile(false);
        alert("Profile updated successfully!");
    };

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        // Trigger only if the background is clicked
        if (e.target === e.currentTarget) {
            onToggle?.();
        }
    };

    const isLoading = !userData; // Check if user data is loading

    return (
        <div
            className={`fixed top-0 left-0 z-20 h-screen pt-16 transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden
      ${isOpen ? "w-64" : "w-0 lg:w-20"}
      `}
        >
            <div
                className={`h-full px-3 py-4 flex flex-col ${!isOpen && "lg:px-3 px-0"}`}
                onClick={handleBackgroundClick}
            >
                <ul className="space-y-2 font-medium flex-grow">
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={index} className={!isOpen ? "lg:block hidden" : ""}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center p-2 rounded-lg group relative
                  ${isActive
                                        ? "text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-700"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }
                  ${!isOpen ? "lg:justify-center" : ""}`}
                                >
                                    {/* Active indicator line */}
                                    {isActive && (
                                        <div
                                            className="absolute left-0 top-0 h-full w-0.5 bg-gray-900 dark:bg-gray-300 rounded-r"
                                        />
                                    )}

                                    {/* Icon wrapper to maintain consistent size */}
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        {item.icon}
                                    </div>

                                    {/* Title with transition */}
                                    <span
                                        className={`flex-1 ms-3 whitespace-nowrap transition-all duration-300
                    ${!isOpen ? "lg:w-0 lg:overflow-hidden lg:opacity-0" : "w-auto opacity-100"}`}
                                    >
                    {item.title}
                  </span>

                                    {/* Tooltip for collapsed state */}
                                    {!isOpen && (
                                        <div
                                            className="absolute left-full ml-6 py-1 px-2 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            {item.title}
                                        </div>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className={`border-t border-gray-200 dark:border-gray-700 mt-6 pt-6 
        ${!isOpen ? "lg:block hidden" : ""}`}>
                    <button
                        onClick={() => setShowLogout(true)}
                        className={`flex items-center p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group mb-3
            ${!isOpen ? "lg:justify-center" : ""}`}
                        aria-label="Logout"
                    >
                        <LogOut className={`${!isOpen ? "h-6 w-6" : "h-5 w-5"}`} />
                        <span
                            className={`font-medium ms-3 transition-all duration-300
              ${!isOpen ? "lg:w-0 lg:overflow-hidden lg:opacity-0" : "w-auto opacity-100"}`}
                        >
              Logout
            </span>

                        {/* Tooltip for logout when collapsed */}
                        {!isOpen && (
                            <div
                                className="absolute left-full ml-6 py-1 px-2 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                Logout
                            </div>
                        )}
                    </button>

                    <div className={`flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 mt-auto
          ${!isOpen ? "lg:justify-center" : ""}`}
                    >
                        <button
                            onClick={() => setShowProfile(true)}
                            className="flex items-center w-full"
                        >
                            <CircleUser className={`rounded-full ${!isOpen ? "w-12 h-12" : "w-10 h-10"}`} />
                            <div
                                className={`transition-all duration-300 ml-2
                ${!isOpen ? "lg:w-0 lg:overflow-hidden lg:opacity-0" : "w-auto opacity-100"}`}
                            >
                                {isLoading ? (
                                    <div>Loading...</div>
                                ) : (
                                    <>
                                        <h3 className="font-medium">{userData?.name || "User Name"}</h3>
                                        <p className="text-sm text-gray-400">{userData?.id || "ID"}</p>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <Logout
                isOpen={showLogout}
                onClose={() => setShowLogout(false)}
                onConfirm={handleLogout}
            />

            <Profile
                isOpen={showProfile}
                onClose={() => setShowProfile(false)}
                userData={userData}
                onSave={handleProfileSave}
            />
        </div>
    );
};

export default Sidebar;