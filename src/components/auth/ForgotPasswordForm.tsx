import React, { useState } from 'react';
import { Label, TextInput, Button, Modal } from 'flowbite-react';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import axios from 'axios';
import { toast } from 'react-toastify';

interface ForgotPasswordFormProps {
    onLoginClick: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onLoginClick }) => {
    const [step, setStep] = useState<'email-captcha' | 'reset-password'>('email-captcha');
    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: '',
        captcha: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showModal, setShowModal] = useState(false);

    const handleEmailCaptchaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Validate email existence
            const emailResponse = await axios.post('/api/check-email', {
                email: forgotPasswordData.email
            });

            if (emailResponse.data.exists) {
                // If both email and captcha are valid, proceed to reset password
                setStep('reset-password');
            } else {
                toast.error('Email tidak terdaftar pada sistem');
            }
        } catch (error) {
            toast.error('Terjadi kesalahan. Silakan coba lagi.');
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
            toast.error('Konfirmasi password tidak sesuai');
            return;
        }

        // Validasi panjang password minimal 8 karakter
        if (forgotPasswordData.newPassword.length < 8) {
            toast.error('Password minimal 8 karakter');
            return;
        }

        try {
            await axios.post('/api/reset-password', {
                email: forgotPasswordData.email,
                newPassword: forgotPasswordData.newPassword
            });

            toast.success('Password berhasil diperbarui');
            setShowModal(true);
        } catch (error) {
            toast.error('Gagal mereset password');
        }
    };

    const renderForm = () => {
        switch (step) {
            case 'email-captcha':
                return (
                    <form onSubmit={handleEmailCaptchaSubmit} className="space-y-4">
                        <h2 className="text-2xl font-bold text-center mb-4">Lupa Password</h2>
                        <div>
                            <Label htmlFor="email" value="Email" />
                            <TextInput
                                icon={HiMail}
                                id="email"
                                placeholder="name@sitrack.com"
                                required
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
                        <div>
                            <Label htmlFor="newPassword" value="Password Baru" />
                            <TextInput
                                icon={HiLockClosed}
                                id="newPassword"
                                placeholder="Password baru"
                                required
                                type="password"
                                value={forgotPasswordData.newPassword}
                                onChange={(e) => setForgotPasswordData(prev => ({
                                    ...prev,
                                    newPassword: e.target.value
                                }))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirmPassword" value="Konfirmasi Password" />
                            <TextInput
                                icon={HiLockClosed}
                                id="confirmPassword"
                                placeholder="Konfirmasi password baru"
                                required
                                type="password"
                                value={forgotPasswordData.confirmPassword}
                                onChange={(e) => setForgotPasswordData(prev => ({
                                    ...prev,
                                    confirmPassword: e.target.value
                                }))}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Reset Password
                        </Button>
                        <Button
                            color="gray"
                            className="w-full mt-2"
                            onClick={() => setStep('email-captcha')}
                        >
                            Batal
                        </Button>
                    </form>
                );
        }
    };

    return (
        <div className="max-w-md mx-auto">
            {renderForm()}

            {/* modal untuk konfirmasi reset password berhasil */}
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