import React, { useState, useEffect } from 'react';
import { Toast, ToastToggle } from 'flowbite-react';
import {
    HiCheck,
    HiExclamation,
    HiX,
    HiInformationCircle
} from 'react-icons/hi';

// Define toast types
type ToastType = 'success' | 'error' | 'warning' | 'info';

// Toast configuration interface
interface ToastConfig {
    message: string;
    type?: ToastType;
    duration?: number;
}

// Toast component
export const ToastNotification: React.FC<{
    config: ToastConfig;
    onClose?: () => void;
}> = ({
          config = { message: '', type: 'info', duration: 3000 },
          onClose
      }) => {
    const [isOpen, setIsOpen] = useState(true);

    // Automatically close toast after duration
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(false);
            onClose?.();
        }, config.duration);

        return () => clearTimeout(timer);
    }, [config.duration, onClose]);

    // Select icon based on toast type
    const getIcon = () => {
        switch (config.type) {
            case 'success':
                return <HiCheck className="h-5 w-5 text-green-500" />;
            case 'error':
                return <HiX className="h-5 w-5 text-red-500" />;
            case 'warning':
                return <HiExclamation className="h-5 w-5 text-yellow-500" />;
            default:
                return <HiInformationCircle className="h-5 w-5 text-blue-500" />;
        }
    };

    // Select color based on toast type
    const getColor = () => {
        switch (config.type) {
            case 'success': return 'text-green-500 bg-green-100';
            case 'error': return 'text-red-500 bg-red-100';
            case 'warning': return 'text-yellow-500 bg-yellow-100';
            default: return 'text-blue-500 bg-blue-100';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-4 right-4 z-50">
            <Toast className={`${getColor()} shadow-lg`}>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                    {getIcon()}
                </div>
                <div className="ml-3 text-sm font-normal">
                    {config.message}
                </div>
                <ToastToggle onDismiss={() => {
                    setIsOpen(false);
                    onClose?.();
                }} />
            </Toast>
        </div>
    );
};

export const useToast = () => {
    const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);

    const showToast = (config: ToastConfig) => {
        setToastConfig(config);
    };

    const closeToast = () => {
        setToastConfig(null);
    };

    return {
        showToast,
        ToastComponent: toastConfig
            ? <ToastNotification
                config={toastConfig}
                onClose={closeToast}
            />
            : null
    };
};