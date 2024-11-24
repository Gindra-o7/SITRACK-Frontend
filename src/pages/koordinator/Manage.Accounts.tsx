import React, {useState} from 'react';
import {Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, X} from 'lucide-react';

const ManageAccounts = () => {
    const [selectedRole, setSelectedRole] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const roles = [
        {id: 'all', label: 'Semua'},
        {id: 'mahasiswa', label: 'Mahasiswa'},
        {id: 'dosen', label: 'Dosen'},
        {id: 'kaprodi', label: 'Kaprodi'},
        {id: 'koordinator', label: 'Koordinator'},
        {id: 'pembimbing', label: 'Pembimbing Instansi'}
    ];

    // Sample data - replace with your actual data
    const users = [
        {id: 1, name: 'John Doe', email: 'john@example.com', role: 'mahasiswa', nim: '123456', status: 'aktif'},
        {id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'dosen', nip: '789012', status: 'aktif'},
        // Add more sample data as needed
    ];

    // Modal Components
    const Modal = ({title, onClose, children}) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X/>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );

    const AddUserModal = () => (
        <Modal title="Tambah Akun Baru" onClose={() => setShowAddModal(false)}>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nama</label>
                    <input type="text" className="mt-1 w-full border rounded-md p-2"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" className="mt-1 w-full border rounded-md p-2"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select className="mt-1 w-full border rounded-md p-2">
                        {roles.filter(role => role.id !== 'all').map(role => (
                            <option key={role.id} value={role.id}>{role.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">NIM/NIP</label>
                    <input type="text" className="mt-1 w-full border rounded-md p-2"/>
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </Modal>
    );

    return (
        <div className=" flex bg-gray-50">
            <div className="flex-1 overflow-auto m-8">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manajemen User</h1>
                    <p className="text-gray-600">Kelola semua akun pengguna dalam sistem</p>
                </div>

                {/* Filter and Search Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
                    {/* Role Filter */}
                    <div className="flex flex-wrap gap-2">
                        {roles.map(role => (
                            <button
                                key={role.id}
                                onClick={() => setSelectedRole(role.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedRole === role.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {role.label}
                            </button>
                        ))}
                    </div>

                    {/* Search and Add Button */}
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0">
                            <input
                                type="text"
                                placeholder="Cari pengguna..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"/>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <Plus className="h-5 w-5"/>
                            <span>Tambah</span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white rounded-lg shadow mt-3">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM/NIP</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {roles.find(r => r.id === user.role)?.label}
                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.nim || user.nip}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${user.status === 'aktif'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'}`}>
                    {user.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setShowEditModal(true)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <Pencil className="h-5 w-5"/>
                                        </button>
                                        <button
                                            onClick={() => setShowDeleteModal(true)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 className="h-5 w-5"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-700">
                        Showing 1 to 10 of 20 entries
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="p-2 border rounded-md hover:bg-gray-50"
                        >
                            <ChevronLeft className="h-5 w-5"/>
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="p-2 border rounded-md hover:bg-gray-50"
                        >
                            <ChevronRight className="h-5 w-5"/>
                        </button>
                    </div>
                </div>

                {/* Modals */}
                {showAddModal && <AddUserModal/>}

            </div>
        </div>
    );
};

export default ManageAccounts;