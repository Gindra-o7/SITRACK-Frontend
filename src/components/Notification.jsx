import { useState, useRef, useEffect } from "react";
import { Bell, BellDot } from "lucide-react";

const Notification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasActiveNotifications, setHasActiveNotifications] = useState(true);
    const dropdownRef = useRef(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNotificationsClick = () => {
        setHasActiveNotifications(false);
        setIsOpen(false);
    };

    const NotificationItem = ({ text }) => (
        <a
            href="#"
            onClick={handleNotificationsClick}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
            {text}
        </a>
    );

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            {/* Notification Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 focus:outline-none"
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
            >
                <div className="py-1">
                    <NotificationItem text="Notifikasi 1" />
                    <NotificationItem text="Notifikasi 2" />
                </div>
            </div>
        </div>
    );
};

export default Notification;