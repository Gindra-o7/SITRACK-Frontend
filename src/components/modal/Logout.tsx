import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth.contexts";

interface LogoutProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const Logout: React.FC<LogoutProps> = ({ isOpen, onClose, onConfirm }) => {
    const navigate = useNavigate();
    const { logout } = useAuth(); // Menggunakan hook useAuth untuk akses fungsi logout

    if (!isOpen) return null;

    const handleLogout = (): void => {
        try {
            // Panggil fungsi logout dari context
            logout();

            // Hapus token dari localStorage dan sessionStorage
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userRole');

            // Panggil fungsi onConfirm dari props jika diperlukan
            onConfirm();

            // Navigasi ke landing page
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
            // Bisa ditambahkan toast/notification untuk error handling
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
                role="button"
                tabIndex={-1}
                aria-label="Close modal"
            />

            {/* modal */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-4 p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Konfirmasi Logout
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Apakah Anda yakin ingin keluar dari akun Anda?
                </p>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                        Keluar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;