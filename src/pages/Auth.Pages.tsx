import React, {useState} from "react"
import { Card } from "flowbite-react";
import { LoginForm } from "@/components/auth/LoginForm"
import { RegisterForm } from "@/components/auth/RegisterForm"
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const AuthPage: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'login' | 'register' | 'forgot-password'>('login');

  const renderForm = () => {
    switch (activeForm) {
      case 'login':
        return (
            <LoginForm
                onRegisterClick={() => setActiveForm('register')}
                onForgotPasswordClick={() => setActiveForm('forgot-password')}
            />
        );
      case 'register':
        return (
            <RegisterForm
                onLoginClick={() => setActiveForm('login')}
            />
        );
      case 'forgot-password':
        return (
            <ForgotPasswordForm
                onLoginClick={() => setActiveForm('login')}
            />
        );
    }
  };

  return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Black, Gray, and White Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-800 to-white bg-size-200 animate-gradient-x"></div>

        <div className="relative z-10 w-full max-w-md p-4">
          <Card className="w-full">
            {renderForm()}
          </Card>
        </div>
      </div>
  );
};