import React, { MouseEvent } from "react";
import { Menu } from "lucide-react";

interface NavbarProps {
  title: string;
  onToggleSidebar: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ title, onToggleSidebar }) => {
  return (
    <header className="bg-white shadow fixed w-full top-0 z-30">
      <div className="flex justify-between items-center px-8 py-4">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-medium">{title}</h1>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
