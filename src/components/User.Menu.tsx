import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

interface MenuItemProps {
    active: boolean;
}

const UserMenu: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = (): void => {
        // Lakukan tindakan logout, misalnya menghapus token atau mengirim permintaan ke server
        navigate("/");
    };

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="focus:outline-none">
                <div
                    className="w-8 h-8 bg-gray-300 rounded-full"
                    aria-label="User menu"
                />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }: MenuItemProps) => (
                                <a
                                    href="/profile"
                                    className={`${
                                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                    } flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-150`}
                                    role="menuitem"
                                >
                                    <User className="w-5 h-5 mr-2" aria-hidden="true" />
                                    Profil
                                </a>
                            )}
                        </Menu.Item>
                        <div className="my-1 h-px bg-gray-300" role="separator" />
                        <Menu.Item>
                            {({ active }: MenuItemProps) => (
                                <button
                                    onClick={handleLogout}
                                    className={`${
                                        active ? "bg-gray-100 text-red-600" : "text-red-500"
                                    } flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-150`}
                                    role="menuitem"
                                >
                                    <LogOut className="w-5 h-5 mr-2" aria-hidden="true" />
                                    Keluar
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default UserMenu;