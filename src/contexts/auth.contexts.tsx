import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import axiosInstance from "../configs/axios.configs.ts";

interface User {
    id: string;
    email: string;
    password: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    validateToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    // Login function
    const login = async (email: string, password: string) => {
        const response = await axiosInstance.post("/login", { email, password });
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        setToken(token);
        setUser(user);
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    // Validate token function
    const validateToken = async () => {
        if (!token) return;
        try {
            const response = await axiosInstance.post("/validate-token", {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data.user);
        } catch (error) {
            console.error("Token validation failed:", error);
            logout();
        }
    };

    useEffect(() => {
        validateToken();
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!user,
                validateToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
