import React, { useState } from 'react';
import {
    Bell,
    Send,
    Users,
    Clock,
    CheckCircle,
    AlertCircle,
    ChevronDown,
    Search,
    Filter,
    X
} from 'lucide-react';

const Notification = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Pengumpulan Laporan KP",
            message: "Reminder untuk mengumpulkan laporan KP sebelum tanggal 20 April 2024",
            timestamp: "2024-03-15T10:30:00",
            status: "unread",
            type: "reminder",
            recipients: ["mahasiswa"],
            sender: "koordinator"
        },
        {
            id: 2,
            title: "Jadwal Seminar KP",
            message: "Jadwal seminar KP telah dirilis untuk periode April 2024",
            timestamp: "2024-03-14T14:20:00",
            status: "read",
            type: "announcement",
            recipients: ["mahasiswa", "dosen"],
            sender: "kaprodi"
        },
        {
            id: 3,
            title: "Validasi Dokumen",
            message: "Ada dokumen baru yang perlu divalidasi",
            timestamp: "2024-03-13T09:15:00",
            status: "unread",
            type: "task",
            recipients: ["koordinator"],
            sender: "system"
        }
    ]);

    const [showSendForm, setShowSendForm] = useState(false);
    const [newNotification, setNewNotification] = useState({
        title: '',
        message: '',
        recipients: [],
        type: 'announcement'
    });

    const [filters, setFilters] = useState({
        search: '',
        type: 'all',
        status: 'all'
    });

    const userRoles = [
        { id: 'mahasiswa', label: 'Mahasiswa' },
        { id: 'dosen', label: 'Dosen' },
        { id: 'koordinator', label: 'Koordinator' },
        { id: 'kaprodi', label: 'Kaprodi' }
    ];

    const notificationTypes = [
        { id: 'announcement', label: 'Pengumuman', color: 'blue' },
        { id: 'reminder', label: 'Pengingat', color: 'yellow' },
        { id: 'task', label: 'Tugas', color: 'green' }
    ];

    const handleSendNotification = (e) => {
        e.preventDefault();
        const newNotif = {
            id: notifications.length + 1,
            ...newNotification,
            timestamp: new Date().toISOString(),
            status: 'unread',
            sender: 'koordinator' // Assumed current user role
        };

        setNotifications([newNotif, ...notifications]);
        setNewNotification({
            title: '',
            message: '',
            recipients: [],
            type: 'announcement'
        });
        setShowSendForm(false);
    };

    const handleRecipientToggle = (roleId) => {
        setNewNotification(prev => ({
            ...prev,
            recipients: prev.recipients.includes(roleId)
                ? prev.recipients.filter(r => r !== roleId)
                : [...prev.recipients, roleId]
        }));
    };

    const getTypeColor = (type) => {
        const typeConfig = notificationTypes.find(t => t.id === type);
        return typeConfig ? typeConfig.color : 'gray';
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredNotifications = notifications
        .filter(notif => {
            const matchesSearch = notif.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                notif.message.toLowerCase().includes(filters.search.toLowerCase());
            const matchesType = filters.type === 'all' || notif.type === filters.type;
            const matchesStatus = filters.status === 'all' || notif.status === filters.status;
            return matchesSearch && matchesType && matchesStatus;
        });

    return (
        <div className="container p-4 md:p-6 bg-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        Notifikasi
                    </h1>
                    <p className="text-gray-600 mt-1">Kelola dan kirim notifikasi ke pengguna</p>
                </div>
                <button
                    onClick={() => setShowSendForm(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors w-full md:w-auto justify-center"
                >
                    <Send className="w-4 h-4" />
                    Kirim Notifikasi Baru
                </button>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari notifikasi..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <select
                            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filters.type}
                            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                        >
                            <option value="all">Semua Tipe</option>
                            {notificationTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.label}</option>
                            ))}
                        </select>
                        <select
                            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                        >
                            <option value="all">Semua Status</option>
                            <option value="unread">Belum Dibaca</option>
                            <option value="read">Sudah Dibaca</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Daftar Notifikasi
                    </h2>
                </div>
                <div className="divide-y">
                    {filteredNotifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            Tidak ada notifikasi ditemukan
                        </div>
                    ) : (
                        filteredNotifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`p-4 hover:bg-gray-50 transition-colors ${
                                    notif.status === 'unread' ? 'bg-blue-50' : ''
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                        ${getTypeColor(notif.type) === 'blue' ? 'bg-blue-100 text-blue-700' :
                          getTypeColor(notif.type) === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'}`}>
                        {notificationTypes.find(t => t.id === notif.type)?.label}
                      </span>
                                            <span className="text-sm text-gray-500">
                        {formatTimestamp(notif.timestamp)}
                      </span>
                                        </div>
                                        <h3 className="font-medium mb-1">{notif.title}</h3>
                                        <p className="text-gray-600 text-sm">{notif.message}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Users className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-500">
                        Penerima: {notif.recipients.map(r =>
                                                userRoles.find(role => role.id === r)?.label
                                            ).join(', ')}
                      </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {notif.status === 'unread' ? (
                                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                        ) : (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Send Notification Modal */}
            {showSendForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-xl font-semibold">Kirim Notifikasi Baru</h2>
                                <button
                                    onClick={() => setShowSendForm(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <form onSubmit={handleSendNotification} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Tipe Notifikasi</label>
                                <select
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newNotification.type}
                                    onChange={(e) => setNewNotification(prev => ({ ...prev, type: e.target.value }))}
                                    required
                                >
                                    {notificationTypes.map(type => (
                                        <option key={type.id} value={type.id}>{type.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Judul</label>
                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newNotification.title}
                                    onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                                    required
                                    placeholder="Masukkan judul notifikasi"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Pesan</label>
                                <textarea
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={4}
                                    value={newNotification.message}
                                    onChange={(e) => setNewNotification(prev => ({ ...prev, message: e.target.value }))}
                                    required
                                    placeholder="Masukkan isi pesan notifikasi"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Penerima</label>
                                <div className="space-y-2">
                                    {userRoles.map(role => (
                                        <label key={role.id} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={newNotification.recipients.includes(role.id)}
                                                onChange={() => handleRecipientToggle(role.id)}
                                                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                                            />
                                            <span>{role.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    Kirim Notifikasi
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowSendForm(false)}
                                    className="flex-1 border px-4 py-2 rounded-lg hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;