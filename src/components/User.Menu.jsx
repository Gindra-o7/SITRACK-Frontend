import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const UserMenu = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Lakukan tindakan logout, misalnya menghapus token atau mengirim permintaan ke server
    navigate("/");
  };
  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
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
        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } block px-4 py-2 text-sm`}
                >
                  <User className="w-5 h-5 inline-block mr-2" />
                  Profil
                </a>
              )}
            </Menu.Item>
            <div className="my-1 h-px bg-gray-300" />
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={handleLogout}
                  className={`${
                    active ? "bg-gray-100 text-red-600" : "text-red-500"
                  } block px-4 py-2 text-sm`}
                >
                  <LogOut className="w-5 h-5 inline-block mr-2" />
                  Keluar
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
