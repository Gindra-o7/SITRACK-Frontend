import { useState } from "react";
import { Menu, X } from "lucide-react";
import { HeaderProps } from "../../interfaces/common.interfaces.ts";
import logo from "../../assets/logoimage.png";

const Header = ({
                    isLogin,
                    onLoginClick,
                    onGoToDashboardClick,
                }: HeaderProps) => {
    const [showModal, setShowModal] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "#", text: "Beranda" },
        { href: "#features", text: "Fitur" },
        { href: "#flow", text: "Alur" },
        { href: "#faq", text: "FAQ" },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
                <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                        <img src={logo} alt="Logo" className="h-8 w-8" />
                        <span className="text-xl font-bold">SITRACK</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="relative py-2 after:content-[''] after:scale-x-0 after:h-[2px] after:inline-block after:absolute after:bottom-0 after:bg-primary after:transition-all after:duration-[200ms] hover:after:scale-x-50 after:inset-x-0 hover:transition-all hover:duration-[400ms]"
                            >
                                {link.text}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        {isLogin && (
                            <button
                                onClick={onGoToDashboardClick}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Pergi ke Dashboard
                            </button>
                        )}
                        <button
                            onClick={isLogin ? () => setShowModal(true) : onLoginClick}
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            {isLogin ? "Sign Out" : "Sign In"}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                >
                    <div className="px-6 py-4 bg-gray-50 space-y-4 border-t">
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-700 hover:text-gray-900 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.text}
                                </a>
                            ))}
                        </nav>

                        <div className="flex flex-col gap-3 pt-4 border-t">
                            {isLogin && (
                                <button
                                    onClick={() => {
                                        onGoToDashboardClick();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Pergi ke Dashboard
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    if (isLogin) {
                                        setShowModal(true);
                                    } else {
                                        onLoginClick();
                                    }
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                {isLogin ? "Sign Out" : "Sign In"}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Spacer to prevent content from hiding behind fixed header */}
            <div className="h-[72px]"></div>

            {/* Logout Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                        <h2 className="text-xl font-bold mb-4">Logout Confirmation</h2>
                        <p className="mb-6">Apakah kamu yakin mau logout dari aplikasi?</p>
                        {isLogout && <div className="text-center mb-4">Loading...</div>}
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Gak jadi deh
                            </button>
                            <button
                                onClick={() => {
                                    setIsLogout(true);
                                    onLoginClick();
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
