import React, {useState, useEffect, useCallback} from "react";
import axiosInstance from "../../../configs/axios.configs";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";
import {
    Badge,
    Button,
    Modal,
    Table,
    Pagination,
    TextInput,
    Label,
} from "flowbite-react";

interface User {
    id: number;
    nama: string;
    email: string;
    role: string;
    photoPath?: string;
    status?: string;
    nim?: string;
    nip?: string;
    createdAt: string;
}

const ManageAccounts = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [selectedRole, setSelectedRole] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sortConfig, setSortConfig] = useState({
        key: "createdAt",
        direction: "desc",
    });
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
    const [toastMessage, setToastMessage] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const roles = [
        {id: "all", label: "Semua"},
        {id: "mahasiswa", label: "Mahasiswa"},
        {id: "dosen_penguji", label: "Dosen Penguji"},
        {id: "dosen_pembimbing", label: "Dosen Pembimbing"},
        {id: "kaprodi", label: "Kaprodi"},
        {id: "koordinator", label: "Koordinator"},
        {id: "pembimbing", label: "Pembimbing Instansi"},
    ];

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const params = {
                page: currentPage,
                pageSize: itemsPerPage,
                role: selectedRole === "all" ? undefined : selectedRole,
                sortBy: sortConfig.key === "nimNipNik" ? "createdAt" : sortConfig.key,
                sortOrder: sortConfig.direction,
            };

            const response = await axiosInstance.get("/koordinator/users", {params});
            setUsers(response.data.users);
            setTotalUsers(response.data.total);
        } catch (err) {
            setError("Failed to fetch users. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch users when dependencies change
    useEffect(() => {
        fetchUsers();
    }, [currentPage, selectedRole, sortConfig]);

    // Sorting function
    const handleSort = (key: string) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({key, direction});
    };

    // Pagination
    const totalPages = Math.ceil(totalUsers / itemsPerPage);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewUserData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const toggleRole = (roleId: string) => {
        setNewUserData(prev => {
            const currentRoles = prev.roles;
            const isRoleSelected = currentRoles.includes(roleId);

            return {
                ...prev,
                roles: isRoleSelected
                    ? currentRoles.filter(role => role !== roleId)
                    : [...currentRoles, roleId]
            };
        });
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Validate input
            if (!newUserData.nama || !newUserData.email || newUserData.roles.length === 0 || !newUserData.password) {
                throw new Error("Harap lengkapi semua field yang wajib");
            }

            // Prepare payload
            const payload = {
                nama: newUserData.nama,
                email: newUserData.email,
                roles: newUserData.roles,
                password: newUserData.password,
                // Conditionally add NIM or NIP based on roles
                ...(newUserData.roles.includes('mahasiswa') ? { nim: newUserData.nim } :
                    newUserData.roles.includes('dosen_pembimbing') || newUserData.roles.includes('dosen_penguji')
                        ? { nip: newUserData.nip }
                        : {})
            };

            // Log payload for debugging
            console.log("Sending payload:", JSON.stringify(payload, null, 2));

            // Send POST request
            const response = await axiosInstance.post("/koordinator/user", payload);

            // Log the entire response
            console.log("Full response:", response);

            // Use response data if available
            const responseData = response.data;
            console.log("Response data:", responseData);

            // Handle successful response
            setToastMessage({
                type: 'success',
                message: responseData?.message || 'Berhasil menambahkan pengguna baru'
            });

            // Optionally use response data to update state or perform further actions
            if (responseData && responseData.user) {
                // Example: You might want to add the new user to your existing users list
                setUsers(prevUsers => [...prevUsers, responseData.user]);
            }

            // Refresh user list (optional, since you might already have added the user)
            fetchUsers();

            // Close the modal
            setShowAddModal(false);

        } catch (error: any) {
            // Detailed error logging
            console.error("Full error object:", error);
            console.error("Error response:", error.response);
            console.error("Error message:", error.message);
            console.error("Error status:", error.status);

            // More detailed error message
            const errorMessage = error.response?.data?.message ||
                error.response?.data ||
                error.message ||
                'Gagal menambahkan pengguna';

            setToastMessage({
                type: 'error',
                message: errorMessage
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

            {/* Loading and Error States */
            }
            {
                isLoading && (
                    <div className="text-center py-4 text-gray-600">Loading...</div>
                )
            }
            {
                error && (
                    <div className="text-center py-4 text-red-600">{error}</div>
                )
            }

            {/* Users Table */}
            {
                !isLoading && !error && (
                    <>
                        <Table hoverable>
                            <Table.Head>
                                {["Nama", "Email", "Role", "Dibuat", "Aksi"].map((header, index) => (
                                    <Table.HeadCell key={index}>
                                        {header}
                                    </Table.HeadCell>
                                ))}
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {users.map((user) => (
                                    <Table.Row key={user.id}>
                                        <Table.Cell>{user.nama}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>
                                            <Badge color="info">
                                                {roles.find((r) => r.id === user.role)?.label}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    color="light"
                                                    onClick={() => setShowEditModal(true)}
                                                >
                                                    <Pencil className="h-4 w-4"/>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    color="failure"
                                                    onClick={() => setShowDeleteModal(true)}
                                                >
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>

                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-4">
                            <div className="text-sm text-gray-700">
                                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                                {Math.min(currentPage * itemsPerPage, totalUsers)} of{" "}
                                {totalUsers} entries
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </>
                )}

            {/* Add User Modal */}
            <Modal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                size="md"
            >
                <Modal.Header>Tambah Akun Baru</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAddUser} className="space-y-4">
                        <div>
                            <Label htmlFor="nama">Nama</Label>
                            <TextInput
                                id="nama"
                                name="nama"
                                value={newUserData.nama}
                                onChange={handleInputChange}
                                required
                                placeholder="Masukkan nama lengkap"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={newUserData.email}
                                onChange={handleInputChange}
                                required
                                placeholder="contoh@email.com"
                            />
                        </div>
                        <div>
                            <Label>Pilih Role</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {roles.slice(1).map((role) => (
                                    <Badge
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
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={newUserData.password}
                                onChange={handleInputChange}
                                required
                                placeholder="Masukkan password"
                            />
                        </div>
                        {(newUserData.roles.includes('mahasiswa') ||
                            newUserData.roles.includes('dosen_pembimbing') ||
                            newUserData.roles.includes('dosen_penguji')) && (
                            <div>
                                <Label htmlFor="nim-nip">
                                    {newUserData.roles.includes('mahasiswa') ? 'NIM' : 'NIP'}
                                </Label>
                                <TextInput
                                    id="nim-nip"
                                    type="text"
                                    name={newUserData.roles.includes('mahasiswa') ? 'nim' : 'nip'}
                                    value={newUserData.roles.includes('mahasiswa') ? newUserData.nim : newUserData.nip}
                                    onChange={handleInputChange}
                                    required
                                    placeholder={newUserData.roles.includes('mahasiswa') ? 'Masukkan NIM' : 'Masukkan NIP'}
                                />
                            </div>
                        )}
                        <div className="flex justify-end space-x-2">
                            <Button
                                color="light"
                                onClick={() => setShowAddModal(false)}
                            >
                                Batal
                            </Button>
                            <Button type="submit" color="blue" onClick={handleAddUser}>
                                Kirim
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ManageAccounts;