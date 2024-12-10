import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Menambahkan deklarasi untuk tipe impor gambar
declare module "*.png" {
    const value: string;
    export default value;
}

import logo from "../assets/logoimage.png";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleMasukClick = (): void => {
        navigate("/login");
    };

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSidebar = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo dan Judul */}
                    <div className="flex items-center space-x-4">
                        <img src={logo} alt="Logo" className="h-10 w-10 mr-3" />
                        <span className="text-xl font-bold text-blue-800">SITRACK</span>
                    </div>

                    {/* Links untuk tampilan Desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a
                            href="#home"
                            className="relative py-2 after:content-[''] after:scale-x-0 after:h-[2px] after:inline-block after:absolute after:bottom-0 after:bg-primary after:transition-all after:duration-[200ms] hover:after:scale-x-50 after:inset-x-0 hover:transition-all hover:duration-[400ms]"
                        >
                            Beranda
                        </a>
                        <a
                            href="#features"
                            className="relative py-2 after:content-[''] after:scale-x-0 after:h-[2px] after:inline-block after:absolute after:bottom-0 after:bg-primary after:transition-all after:duration-[200ms] hover:after:scale-x-50 after:inset-x-0 hover:transition-all hover:duration-[400ms]"
                        >
                            Fitur
                        </a>
                        <a
                            href="#flow"
                            className="relative py-2 after:content-[''] after:scale-x-0 after:h-[2px] after:inline-block after:absolute after:bottom-0 after:bg-primary after:transition-all after:duration-[200ms] hover:after:scale-x-50 after:inset-x-0 hover:transition-all hover:duration-[400ms]"
                        >
                            Alur
                        </a>
                        <a
                            href="#faq"
                            className="relative py-2 after:content-[''] after:scale-x-0 after:h-[2px] after:inline-block after:absolute after:bottom-0 after:bg-primary after:transition-all after:duration-[200ms] hover:after:scale-x-50 after:inset-x-0 hover:transition-all hover:duration-[400ms]"
                        >
                            FAQ
                        </a>
                        <button
                            onClick={handleMasukClick}
                            className="bg-primary text-white bg-blue-800 px-6 py-2 rounded-lg hover:bg-black transition-colors"
                        > 
                            Masuk
                        </button>
                    </div>

                    {/* Tombol Hamburger untuk tampilan mobile */}
                    <div className="flex md:hidden">
                        <button
                            className="text-gray-700 hover:text-gray-900 focus:outline-none"
                            onClick={toggleSidebar}
                        >
                            <svg
                                className="h-6 w-6 fill-current"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar untuk Mobile */}
            <div
                className={`fixed top-0 right-0 z-20 w-64 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                } md:hidden`}
            >
                <div className="h-full px-6 py-8 overflow-y-auto">
                    <a
                        href="#home"
                        className="block py-2 hover:bg-gray-100 rounded-lg px-4"
                        onClick={() => setIsOpen(false)}
                    >
                        Beranda
                    </a>
                    <a
                        href="#features"
                        className="block py-2 hover:bg-gray-100 rounded-lg px-4"
                        onClick={() => setIsOpen(false)}
                    >
                        Fitur
                    </a>
                    <a
                        href="#flow"
                        className="block py-2 hover:bg-gray-100 rounded-lg px-4"
                        onClick={() => setIsOpen(false)}
                    >
                        Alur
                    </a>
                    <a
                        href="#faq"
                        className="block py-2 hover:bg-gray-100 rounded-lg px-4"
                        onClick={() => setIsOpen(false)}
                    >
                        FAQ
                    </a>
                    <button
                        onClick={() => {
                            handleMasukClick();
                            setIsOpen(false);
                        }}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors block w-full mt-4"
                    >
                        Masuk
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
