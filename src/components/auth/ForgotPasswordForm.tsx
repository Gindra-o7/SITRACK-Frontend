import React, { useState } from 'react';
import { Label, TextInput, Button, Modal, Alert } from 'flowbite-react';
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiInformationCircle } from 'react-icons/hi';
import axiosInstance from "../../configs/axios.configs"
import axios from "axios";

interface ForgotPasswordFormProps {
    onLoginClick: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onLoginClick }) => {
    const [step, setStep] = useState<'email-captcha' | 'reset-password'>('email-captcha');
    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });

    // State untuk alert
    const [alert, setAlert] = useState<{
        show: boolean;
        message: string;
        type: 'failure' | 'success' | 'warning';
    }>({
        show: false,
        message: '',
        type: 'failure'
    });

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Fungsi untuk menampilkan alert
    const showAlert = (message: string, type: 'failure' | 'success' | 'warning') => {
        setAlert({
            show: true,
            message,
            type
        });
        // Sembunyikan alert setelah 3 detik
        setTimeout(() => {
            setAlert(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    const handleEmailCaptchaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const emailResponse = await axiosInstance.post('/check-email', {
                email: forgotPasswordData.email
            });

            if (emailResponse.data.exists) {
                setStep('reset-password');
            } else {
                showAlert('Email tidak terdaftar pada sistem', 'failure');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showAlert(error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.', 'failure');
            } else {
                showAlert('Terjadi kesalahan. Silakan coba lagi.', 'failure');
            }
        }
    };

    const validatePassword = (): { isValid: boolean; message?: string } => {
        if (forgotPasswordData.newPassword.length < 8) {
            return {
                isValid: false,
                message: 'Password minimal 8 karakter'
            };
        }

        if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
            return {
                isValid: false,
                message: 'Konfirmasi password tidak sesuai'
            };
        }

        // Tambahan validasi password (opsional)
        const hasUpperCase = /[A-Z]/.test(forgotPasswordData.newPassword);
        const hasLowerCase = /[a-z]/.test(forgotPasswordData.newPassword);
        const hasNumbers = /\d/.test(forgotPasswordData.newPassword);

        if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
            return {
                isValid: false,
                message: 'Password harus mengandung huruf besar, huruf kecil, dan angka'
            };
        }

        return { isValid: true };
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = validatePassword();
        if (!validation.isValid) {
            showAlert(validation.message || 'Password tidak valid', 'warning');
            return;
        }

        try {
            const response = await axiosInstance.post('/reset-password', {
                email: forgotPasswordData.email,
                newPassword: forgotPasswordData.newPassword
            });

            showAlert('Password berhasil diperbarui', 'success');
            setShowModal(true);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showAlert(error.response?.data?.message || 'Gagal mereset password', 'failure');
            } else {
                showAlert('Gagal mereset password', 'failure');
            }
        }
    };

    const renderForm = () => {
        switch (step) {
            case 'email-captcha':
                return (
                    <form onSubmit={handleEmailCaptchaSubmit} className="space-y-4">
                        <h2 className="text-2xl font-bold text-center mb-4">Lupa Password</h2>
                        {alert.show && (
                            <Alert color={alert.type} icon={HiInformationCircle}>
                                <span>{alert.message}</span>
                            </Alert>
                        )}
                        <div>
                            <Label htmlFor="email" value="Email" />
                            <TextInput
                                icon={HiMail}
                                id="email"
                                placeholder="email"
                                required
                                sizing="lg"
                                type="email"
                                value={forgotPasswordData.email}
                                onChange={(e) => setForgotPasswordData(prev => ({
                                    ...prev,
                                    email: e.target.value
                                }))}
                            />
                        </div>
                        <Button type="submit" className="w-full mt-4" color="dark">
                            Lanjutkan
                        </Button>
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={onLoginClick}
                                className="text-black hover:underline"
                            >
                                Kembali ke Login
                            </button>
                        </div>
                    </form>
                );

            case 'reset-password':
                return (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
                        {alert.show && (
                            <Alert color={alert.type} icon={HiInformationCircle}>
                                <span>{alert.message}</span>
                            </Alert>
                        )}
                        <div className="relative">
                            <Label htmlFor="newPassword" value="Password Baru" />
                            <TextInput
                                icon={HiLockClosed}
                                id="newPassword"
                                placeholder="Password baru"
                                required
                                sizing="lg"
                                type={showNewPassword ? "text" : "password"}
                                value={forgotPasswordData.newPassword}
                                onChange={(e) => setForgotPasswordData(prev => ({
                                    ...prev,
                                    newPassword: e.target.value
                                }))}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-9 p-1"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? (
                                    <HiEyeOff className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <HiEye className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                        <div className="relative">
                            <Label htmlFor="confirmPassword" value="Konfirmasi Password" />
                            <TextInput
                                icon={HiLockClosed}
                                id="confirmPassword"
                                placeholder="Konfirmasi password baru"
                                required
                                sizing="lg"
                                type={showConfirmPassword ? "text" : "password"}
                                value={forgotPasswordData.confirmPassword}
                                onChange={(e) => setForgotPasswordData(prev => ({
                                    ...prev,
                                    confirmPassword: e.target.value
                                }))}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-9 p-1"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <HiEyeOff className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <HiEye className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                        <Alert color="info">
                            <span>Password harus memiliki minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka.</span>
                        </Alert>
                        <div className="space-y-2 mt-4">
                            <Button type="submit" className="w-full" color="dark">
                                Reset Password
                            </Button>
                            <Button
                                color="gray"
                                className="w-full"
                                onClick={() => setStep('email-captcha')}
                            >
                                Batal
                            </Button>
                        </div>
                    </form>
                );
        }
    };

    return (
        <div className="max-w-md mx-auto">
            {renderForm()}

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <Modal.Header>Reset Password Berhasil</Modal.Header>
                <Modal.Body>
                    <p>Password Anda telah berhasil diubah. Silakan login dengan password baru.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onLoginClick} color="dark">
                        Kembali ke Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};