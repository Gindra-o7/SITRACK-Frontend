import React, {createContext, useContext, useState, useEffect} from 'react';
import axiosInstance from "../configs/axios.configs.ts";
import {Spinner} from "flowbite-react";

interface AuthContextType {
    isAuthenticated: boolean;
    userEmail: string | null;
    userRole: string | null;
    login: (email: string, roles: string[]) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            // Cek token di localStorage atau sessionStorage
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            if (token) {
                // Set headers untuk axios
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Ambil data user dari storage
                const storedEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
                const storedRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');

                if (storedEmail && storedRole) {
                    setIsAuthenticated(true);
                    setUserEmail(storedEmail);
                    setUserRole(storedRole);
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email: string, roles: string[]) => {
        setIsAuthenticated(true);
        setUserEmail(email);
        setUserRole(roles[0]);

        // Simpan email di storage yang sama dengan token
        if (localStorage.getItem('token')) {
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userRole', roles[0]);
        } else {
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('userRole', roles[0]);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserEmail(null);
        setUserRole(null);

        // Hapus semua data dari storage
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('userRole');

        // Hapus header Authorization
        delete axiosInstance.defaults.headers.common['Authorization'];
    };

    if (isLoading) {
        // Optional: Tambahkan loading spinner
        return <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
            <Spinner size="xl" color="gray"/>
            <p className="text-gray-600 font-medium">Loading, mohon tunggu...</p>
        </div>;
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, userEmail, userRole, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};