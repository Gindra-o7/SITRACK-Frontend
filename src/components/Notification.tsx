import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { Bell, BellDot } from "lucide-react";

interface NotificationItemProps {
    text: string;
}

interface NotificationData {
    id: string;
    text: string;
}

const Notification: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hasActiveNotifications, setHasActiveNotifications] = useState<boolean>(true);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Sample notifications data
    const notifications: NotificationData[] = [
        { id: '1', text: 'Notifikasi 1' },
        { id: '2', text: 'Notifikasi 2' },
    ];

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: globalThis.MouseEvent): void => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNotificationsClick = (e: MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        setHasActiveNotifications(false);
        setIsOpen(false);
    };

    const NotificationItem: React.FC<NotificationItemProps> = ({ text }) => (
        <a
            href="#"
            onClick={handleNotificationsClick}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
        >
            {text}
        </a>
    );

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            {/* Notification Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                aria-label={`Notifications ${hasActiveNotifications ? '(unread)' : ''}`}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {hasActiveNotifications ? (
                    <BellDot className="w-6 h-6" />
                ) : (
                    <Bell className="w-6 h-6" />
                )}
            </button>

            {/* Dropdown Menu */}
            <div
                className={`
                    absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50
                    transform origin-top-right transition-all duration-100 ease-in-out
                    ${isOpen
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 pointer-events-none'
                }
                `}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="notifications-menu"
            >
                <div className="py-1" role="none">
                    {notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            text={notification.text}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notification;