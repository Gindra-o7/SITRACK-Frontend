import React, {useState, ChangeEvent, FormEvent} from "react";
import {ChevronLeft} from "lucide-react";
import {FormData, AdditionalField} from "./types";

interface ProfileProps {
    isOpen: boolean;
    onClose: () => void;
    userData?: {
        name?: string;
        email?: string;
        phone?: string;
        profilePicture?: string;
        [key: string]: any;
    };
    onSave: (data: FormData) => void;
    additionalFields?: AdditionalField[];
}

const Profile: React.FC<ProfileProps> = ({
                                             isOpen,
                                             onClose,
                                             userData,
                                             onSave,
                                             additionalFields = [],
                                         }) => {
    const [formData, setFormData] = useState<FormData>({
        name: userData?.name || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        profilePicture: userData?.profilePicture || "",
        ...additionalFields.reduce((acc, field) => ({
            ...acc,
            [field.name]: field.value,
        }), {}),
    });

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prev) => ({
                    ...prev,
                    profilePicture: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-4 shadow-lg">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <ChevronLeft className="w-6 h-6"/>
                    </button>
                    <div className="flex-grow flex items-center justify-center relative">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Profile Settings
                        </h3>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="flex justify-center relative">
                        <div
                            className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                            {formData.profilePicture ? (
                                <img
                                    src={formData.profilePicture}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-400 text-2xl font-bold">
            {formData.name.charAt(0)}
            </span>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => document.getElementById("profilePictureInput")?.click()}
                            className="absolute bottom-0 right-0 p-2 bg-gray-200 rounded-full shadow-lg hover:bg-gray-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M2.003 5.884L10 1l7.997 4.884v8.232L10 19l-7.997-4.884V5.884z"/>
                            </svg>
                        </button>
                        <input
                            type="file"
                            id="profilePictureInput"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfilePictureChange}
                        />
                    </div>

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

                    {additionalFields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {field.label}
                            </label>
                            <input
                                type={field.type || "text"}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                disabled={field.disabled}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;