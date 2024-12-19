import React from 'react';
import { useNavigate } from "react-router-dom";

interface LogoutProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const Logout: React.FC<LogoutProps> = ({ isOpen, onClose, onConfirm }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLogout = (): void => {
        // Panggil fungsi logout yang diberikan dari parent
        onConfirm();

        // Hapus data user dari localStorage/session jika ada
        localStorage.removeItem('user'); // Sesuaikan dengan key yang Anda gunakan
        sessionStorage.clear();

        // Navigasi ke landing page
        navigate('/');
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
                    Confirm Logout
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Are you sure you want to logout from your account?
                </p>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;