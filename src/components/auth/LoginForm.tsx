import React, { useState } from 'react';
import { Label, TextInput, Button, Checkbox } from 'flowbite-react';
import { X } from "lucide-react";
import {
    HiMail,
    HiLockClosed,
    HiEye,
    HiEyeOff,
} from 'react-icons/hi';
import { useAuth } from "../../contexts/auth.contexts";
import { useNavigate } from 'react-router-dom';
import axiosInstance, { isAxiosError } from "../../configs/axios.configs";
import { useToast } from "../modal/Toast";

interface LoginFormProps {
    onRegisterClick: () => void;
    onForgotPasswordClick: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
                                                        onRegisterClick,
                                                        onForgotPasswordClick
                                                    }) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showToast, ToastComponent } = useToast();

    const validateInput = () => {
        if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            showToast({ message: "Email tidak valid", type: "error" });
            return false;
        }
        if (loginData.password.length < 6) {
            showToast({ message: "Password minimal 6 karakter", type: "error" });
            return false;
        }
        return true;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateInput()) return;

        try {
            const response = await axiosInstance.post('/login', {
                email: loginData.email,
                password: loginData.password,
            });

            const { token, user } = response.data;

            if (!token || !user) {
                throw new Error('Token atau user data tidak valid.');
            }

            // Simpan token berdasarkan rememberMe
            if (loginData.rememberMe) {
                localStorage.setItem("token", token);
            } else {
                sessionStorage.setItem("token", token);
            }

            // Update Auth Context dengan roles dari API
            await login(user.email, user.roles);

            // Tentukan route berdasarkan role pertama
            const primaryRole = user.roles[0];
            const roleRoutes: { [key: string]: string } = {
                mahasiswa: '/mahasiswa',
                dosen_penguji: '/dosen-penguji',
                dosen_pembimbing: '/dosen-pembimbing',
                koordinator: '/koordinator',
                kaprodi: '/kaprodi',
                pembimbing_instansi: '/pembimbing-instansi',
            };

            navigate(roleRoutes[primaryRole] || '/');
            showToast({ message: "Login berhasil!", type: "success" });
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || "Login gagal.";
                showToast({ message: errorMessage, type: "error" });
            } else {
                showToast({ message: "Terjadi kesalahan tidak terduga.", type: "error" });
            }
            console.error("Login Error:", error);
        }
    };

    const togglePasswordVisibility = (e: React.MouseEvent) => {
        e.preventDefault(); // Mencegah form submit
        setShowPassword(!showPassword);
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <>
            {ToastComponent}
            <div className="relative flex items-center justify-center mb-4">
                <h2 className="text-2xl font-bold text-center text-black">Masuk</h2>
                <div className="absolute right-0">
                    <Button
                        size="sm"
                        color="light"
                        onClick={handleBackToHome}
                    >
                        <X className="h-5 w-5"/>
                    </Button>
                </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <Label htmlFor="email" value="Email"/>
                    <TextInput
                        icon={HiMail}
                        id="email"
                        placeholder="name@sitrack.com"
                        required
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData(prev => ({
                            ...prev,
                            email: e.target.value
                        }))}
                    />
                </div>
                <div className="relative">
                    <Label htmlFor="password" value="Password"/>
                    <div className="relative">
                        <TextInput
                            icon={HiLockClosed}
                            id="password"
                            placeholder="Password"
                            required
                            type={showPassword ? "text" : "password"}
                            value={loginData.password}
                            onChange={(e) => {
                                console.log("Password Input Change:", e.target.value); // Debug password
                                setLoginData(prev => ({
                                    ...prev,
                                    password: e.target.value
                                }));
                            }}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
                        >
                            {showPassword ? <HiEyeOff/> : <HiEye/>}
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="remember"
                            checked={loginData.rememberMe}
                            onChange={() => setLoginData(prev => ({
                                ...prev,
                                rememberMe: !prev.rememberMe
                            }))}
                        />
                        <Label htmlFor="remember">Ingat saya</Label>
                    </div>
                    <button
                        type="button"
                        onClick={onForgotPasswordClick}
                        className="text-black hover:underline"
                    >
                        Lupa Password?
                    </button>
                </div>
                <Button className="w-full" color="dark" onClick={handleLogin}>
                    Masuk
                </Button>
                <div className="text-center">
                    <p>
                        Belum punya akun?{' '}
                        <button
                            type="button"
                            onClick={onRegisterClick}
                            className="text-black hover:underline"
                        >
                            Daftar
                        </button>
                    </p>
                </div>
            </form>
        </>
    );
};
