import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ChevronLeft } from 'lucide-react';

interface UserData {
    name?: string;
    email?: string;
    phone?: string;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
}

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData?: UserData;
    onSave: (data: FormData) => void;
}

const Profile: React.FC<ProfileModalProps> = ({ isOpen, onClose, userData, onSave }) => {
    const [formData, setFormData] = useState<FormData>({
        name: userData?.name || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
    });

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* modal */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl mx-4 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Profile Settings
                    </h3>
                    <button
                        onClick={() => handleSubmit({ preventDefault: () => {} } as FormEvent<HTMLFormElement>)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                        Save
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;