import React, {useState} from "react"
import {Card} from "flowbite-react";
import {LoginForm} from "../components/auth/LoginForm"
import {RegisterForm} from "../components/auth/RegisterForm"
import {ForgotPasswordForm} from "../components/auth/ForgotPasswordForm";

const UINSuskaLogo = () => (
    <svg
        className="absolute top-4 left-4 w-16 h-16 z-20"
        viewBox="0 0 8500 11000"
        style={{filter: 'brightness(0.9)'}}
    >
        <g>
            <path
                fill="#ffffff"
                d="M4250 833l1153 1153 -523 0 -630 -630 -1057 1057 -341 0 0 796 -490 394 -663 0 0 -1501 1282 0 1269 -1269zm-2170 1580l382 0 0 695 -382 245 0 -940z"
            />
            <path
                fill="#ffffff"
                d="M-81 5164l1153 -1153 0 523 -630 630 1057 1057 0 342 795 0 395 490 0 662 -1502 0 0 -1282 -1268 -1269zm1580 2170l0 -382 695 0 245 382 -940 0z"
            />
            <path
                fill="#ffffff"
                d="M8581 5164l-1153 1153 0 -522 630 -631 -1057 -1056 0 -342 -795 0 -395 -490 0 -662 1502 0 0 1282 1268 1268zm-1580 -2170l0 382 -695 0 -245 -382 940 0z"
            />
            <path
                fill="#ffffff"
                d="M4250 9495l-1153 -1153 523 0 630 631 1057 -1057 341 0 0 -796 490 -395 663 0 0 1502 -1282 0 -1269 1268zm2170 -1579l-382 0 0 -696 382 -245 0 941z"
            />
            {/* Center ornaments */}
            <path
                fill="#C5D85A"
                d="M4272 3903l0 2480c36,10 62,43 62,82 0,46 -37,84 -84,84 -47,0 -84,-38 -84,-84 0,-39 26,-72 62,-82l0 -2480c-36,-9 -62,-42 -62,-81 0,-46 37,-84 84,-84 47,0 84,38 84,84 0,39 -26,72 -62,81z"
            />
            {/* Additional geometric patterns */}
            <g fill="#C5D85A">
                <path
                    d="M3815 4709c291,-292 603,-509 871,-625 275,-118 506,-130 629,-7 123,123 111,355 -7,629 -115,268 -333,580 -624,872 -291,292 -603,509 -871,625 -275,118 -506,130 -629,7 -123,-123 -111,-355 7,-629 115,-268 333,-580 624,-872z"/>
                <path
                    d="M4685 4709c-291,-292 -603,-509 -871,-625 -275,-118 -506,-130 -629,-7 -123,123 -111,355 7,629 115,268 333,580 624,872 291,292 603,509 871,625 275,118 506,130 629,7 123,-123 111,-355 -7,-629 -115,-268 -333,-580 -624,-872z"/>
            </g>
        </g>
    </svg>
);

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
            <div
                className="absolute inset-0 bg-gradient-to-br from-black via-gray-800 to-white bg-size-200 animate-gradient-x"></div>
            <UINSuskaLogo/>

            <div className="relative z-10 w-full max-w-md p-4">
                <Card className="w-full">
                    {renderForm()}
                </Card>
            </div>
        </div>
    );
};