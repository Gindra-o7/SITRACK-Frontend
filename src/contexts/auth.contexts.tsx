import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    userEmail: string | null;
    userRole: string | null;
    login: (email: string, roles: string[]) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    const login = async (email: string, roles: string[]) => {
        setIsAuthenticated(true);
        setUserEmail(email);
        // Mengambil role pertama sebagai role utama
        setUserRole(roles[0]);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserEmail(null);
        setUserRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userRole');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userEmail, userRole, login, logout }}>
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