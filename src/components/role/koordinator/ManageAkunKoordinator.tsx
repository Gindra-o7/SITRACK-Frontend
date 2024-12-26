import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../configs/axios.configs";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    AlertCircle,
    CheckCircle2,
    Eye,
    EyeOff,
    ArrowUp,
    ArrowDown
} from "lucide-react";
import {
    Badge,
    Button,
    Modal,
    Table,
    Pagination,
    TextInput,
    Label,
    Alert
} from "flowbite-react";

interface User {
    id: string;
    nama: string;
    email: string;
    role: string;
    nim?: string;
    nip?: string;
    photoPath?: string;
    createdAt: string;
}

interface ApiResponse {
    users: User[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

const ManageAccounts = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedRole, setSelectedRole] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [itemsPerPage] = useState(10);
    const [sortBy, setSortBy] = useState<string>("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [showAddModal, setShowAddModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [newUserData, setNewUserData] = useState({
        nama: "",
        email: "",
        roles: [] as string[],
        password: "",
        nim: "",
        nip: ""
    });
    const [alertMessage, setAlertMessage] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const roles = [
        { id: "all", label: "Semua" },
        { id: "mahasiswa", label: "Mahasiswa" },
        { id: "koordinator", label: "Koordinator" },
        { id: "kaprodi", label: "Kaprodi" },
        { id: "dosen_pembimbing", label: "Dosen Pembimbing" },
        { id: "dosen_penguji", label: "Dosen Penguji" },
        { id: "pembimbing_instansi", label: "Instansi" }
    ];

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const params = {
                page: currentPage,
                pageSize: itemsPerPage,
                role: selectedRole === "all" ? undefined : selectedRole,
                search: searchQuery,
                sortBy,
                sortOrder
            };

            const response = await axiosInstance.get<ApiResponse>("/koordinator/users", { params });
            setUsers(response.data.users);
            setTotalUsers(response.data.total);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError("Data tidak ditemukan");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchUsers();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [currentPage, selectedRole, searchQuery, sortBy, sortOrder]);

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
        setCurrentPage(1);
    };

    const getSortIcon = (column: string) => {
        if (sortBy !== column) return null;
        return sortOrder === "asc" ? (
            <ArrowUp className="inline h-4 w-4 ml-1" />
        ) : (
            <ArrowDown className="inline h-4 w-4 ml-1" />
        );
    };

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUserData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const toggleRole = (roleId: string) => {
        setNewUserData(prev => ({
            ...prev,
            roles: [roleId] // Only allow single role selection
        }));
    };

    const [formErrors, setFormErrors] = useState<{
        [key: string]: string
    }>({});

    const resetForm = () => {
        setNewUserData({
            nama: "",
            email: "",
            roles: [],
            password: "",
            nim: "",
            nip: ""
        });
        setFormErrors({});
    };

    const validateForm = () => {
        const errors: { [key: string]: string } = {};

        if (!newUserData.nama) errors.nama = "Nama wajib diisi";
        if (!newUserData.email) errors.email = "Email wajib diisi";
        if (!newUserData.password) errors.password = "Password wajib diisi";
        if (newUserData.roles.length === 0) errors.roles = "Role wajib dipilih";

        if (newUserData.roles.includes('mahasiswa') && !newUserData.nim) {
            errors.nim = "NIM wajib diisi untuk mahasiswa";
        }
        if ((newUserData.roles.includes('koordinator') ||
                newUserData.roles.includes('kaprodi') ||
                newUserData.roles.includes('dosen_penguji') ||
                newUserData.roles.includes('dosen_pembimbing')) &&
            !newUserData.nip) {
            errors.nip = "NIP wajib diisi untuk dosen";
        }

        return errors;
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                setAlertMessage({
                    type: 'error',
                    message: 'Sesi anda telah berakhir. Silakan login kembali.'
                });
                return;
            }

            const payload = {
                nama: newUserData.nama,
                email: newUserData.email,
                password: newUserData.password,
                role: newUserData.roles[0],
                ...(newUserData.roles.includes('mahasiswa') && { nim: newUserData.nim }),
                ...(newUserData.roles.includes('koordinator') ||
                newUserData.roles.includes('kaprodi') ||
                newUserData.roles.includes('dosen_penguji') ||
                newUserData.roles.includes('dosen_pembimbing') ?
                    { nip: newUserData.nip } : {})
            };

            await axiosInstance.post("/koordinator/user", payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setAlertMessage({
                type: 'success',
                message: 'Berhasil menambahkan pengguna baru'
            });

            fetchUsers();
            resetForm();
            setShowAddModal(false);

        } catch (error: any) {
            console.error('Error adding user:', error);
            setAlertMessage({
                type: 'error',
                message: error.response?.data?.message || 'Gagal menambahkan pengguna'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Manajemen User</h1>
                <p className="text-gray-600">
                    Kelola semua akun pengguna dalam sistem
                </p>
            </div>

            {/* Role Filter and Search */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                    {roles.map((role) => (
                        <Button
                            key={role.id}
                            color={selectedRole === role.id ? "blue" : "light"}
                            onClick={() => {
                                setSelectedRole(role.id);
                                setCurrentPage(1);
                            }}
                            size="sm"
                            className="whitespace-nowrap"
                        >
                            {role.label}
                        </Button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <TextInput
                            icon={Search}
                            placeholder="Cari pengguna..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    <Button
                        color="blue"
                        onClick={() => setShowAddModal(true)}
                        className="whitespace-nowrap"
                    >
                        <Plus className="mr-2 h-5 w-5"/>
                        Tambah
                    </Button>
                </div>
            </div>

            {alertMessage && (
                <Alert
                    color={alertMessage.type === 'success' ? 'success' : 'failure'}
                    icon={alertMessage.type === 'success' ? CheckCircle2 : AlertCircle}
                    onDismiss={() => setAlertMessage(null)}
                    className="mb-4"
                >
                    {alertMessage.message}
                </Alert>
            )}

            {isLoading && (
                <div className="text-center py-4 text-gray-600">Loading...</div>
            )}
            {error && (
                <div className="text-center py-4 text-red-600">{error}</div>
            )}

            {!isLoading && !error && (
                <>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell
                                className="cursor-pointer"
                                onClick={() => handleSort("nama")}
                            >
                                Nama {getSortIcon("nama")}
                            </Table.HeadCell>
                            <Table.HeadCell
                                className="cursor-pointer"
                                onClick={() => handleSort("email")}
                            >
                                Email {getSortIcon("email")}
                            </Table.HeadCell>
                            <Table.HeadCell>Role</Table.HeadCell>
                            <Table.HeadCell>NIM/NIP</Table.HeadCell>
                            <Table.HeadCell
                                className="cursor-pointer"
                                onClick={() => handleSort("createdAt")}
                            >
                                Dibuat {getSortIcon("createdAt")}
                            </Table.HeadCell>
                            <Table.HeadCell>Aksi</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {users.map((user) => (
                                <Table.Row key={user.id}>
                                    <Table.Cell>{user.nama}</Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>
                                        <Badge color="info">
                                            {roles.find((r) => r.id === user.role)?.label || user.role}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.nim || user.nip || '-'}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {new Date(user.createdAt).toLocaleDateString('id-ID')}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex gap-2">
                                            <Button size="sm" color="light">
                                                <Pencil className="h-4 w-4"/>
                                            </Button>
                                            <Button size="sm" color="failure">
                                                <Trash2 className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>

                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-700">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                            {Math.min(currentPage * itemsPerPage, totalUsers)} of{" "}
                            {totalUsers} entries
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </>
            )}

            {/* Add User Modal */}
            <Modal
                show={showAddModal}
                onClose={() => {
                    setShowAddModal(false);
                    resetForm();
                }}
                size="md"
            >
                <Modal.Header>Tambah Akun Baru</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAddUser} className="space-y-4">
                        <div>
                            <Label htmlFor="nama" className="mb-2">Nama</Label>
                            <TextInput
                                id="nama"
                                name="nama"
                                value={newUserData.nama}
                                onChange={handleInputChange}
                                color={formErrors.nama ? 'failure' : undefined}
                                helperText={formErrors.nama}
                                placeholder="Masukkan nama lengkap"
                            />
                        </div>

                        <div>
                            <Label htmlFor="email" className="mb-2">Email</Label>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={newUserData.email}
                                onChange={handleInputChange}
                                color={formErrors.email ? 'failure' : undefined}
                                helperText={formErrors.email}
                                placeholder="contoh@email.com"
                            />
                        </div>

                        <div>
                            <Label className="mb-2">Pilih Role</Label>
                            {formErrors.roles && (
                                <div className="text-red-500 text-sm mb-2">{formErrors.roles}</div>
                            )}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {roles.slice(1).map((role) => (<Badge
                                        key={role.id}
                                        color={newUserData.roles.includes(role.id) ? "info" : "light"}
                                        onClick={() => toggleRole(role.id)}
                                        className="cursor-pointer"
                                    >
                                        {role.label}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={newUserData.password}
                                    onChange={handleInputChange}
                                    color={formErrors.password ? "failure" : undefined}
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-2"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <Eye className="h-5 w-5"/> : <EyeOff className="h-5 w-5"/>}
                                </button>
                            </div>
                            {formErrors.password && (
                                <p className="text-sm text-red-500">{formErrors.password}</p>
                            )}
                        </div>

                        {(newUserData.roles.includes('mahasiswa') ||
                            newUserData.roles.some(role => ['koordinator', 'kaprodi', 'dosen_penguji', 'dosen_pembimbing'].includes(role))) && (
                            <div>
                                <Label htmlFor="nim-nip" className="mb-2">
                                    {newUserData.roles.includes('mahasiswa') ? 'NIM' : 'NIP'}
                                </Label>
                                <TextInput
                                    id="nim-nip"
                                    type="text"
                                    name={newUserData.roles.includes('mahasiswa') ? 'nim' : 'nip'}
                                    value={newUserData.roles.includes('mahasiswa') ? newUserData.nim : newUserData.nip}
                                    onChange={handleInputChange}
                                    color={formErrors.nim || formErrors.nip ? 'failure' : undefined}
                                    helperText={formErrors.nim || formErrors.nip}
                                    placeholder={`Masukkan ${newUserData.roles.includes('mahasiswa') ? 'NIM' : 'NIP'}`}
                                />
                            </div>
                        )}

                        <div className="flex justify-end space-x-2">
                            <Button
                                color="light"
                                onClick={() => {
                                    setShowAddModal(false);
                                    resetForm();
                                }}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                color="blue"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Memproses...' : 'Tambah User'}
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ManageAccounts;