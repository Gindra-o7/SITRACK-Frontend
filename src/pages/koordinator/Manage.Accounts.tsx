import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const ManageAccounts = () => {
  const [selectedRole, setSelectedRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const itemsPerPage = 10;
  const roles = [
    { id: "all", label: "Semua" },
    { id: "mahasiswa", label: "Mahasiswa" },
    { id: "dosen", label: "Dosen" },
    { id: "kaprodi", label: "Kaprodi" },
    { id: "koordinator", label: "Koordinator" },
    { id: "pembimbing", label: "Pembimbing Instansi" },
  ];

  const users = [
    // Mahasiswa
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "mahasiswa",
      nim: "123456",
      status: "aktif",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      role: "mahasiswa",
      nim: "123457",
      status: "aktif",
    },
    {
      id: 3,
      name: "Ahmad Ibrahim",
      email: "ahmad@example.com",
      role: "mahasiswa",
      nim: "123458",
      status: "nonaktif",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "mahasiswa",
      nim: "123459",
      status: "aktif",
    },
    {
      id: 5,
      name: "Budi Santoso",
      email: "budi@example.com",
      role: "mahasiswa",
      nim: "123460",
      status: "aktif",
    },
    {
      id: 6,
      name: "Ratna Sari",
      email: "ratna@example.com",
      role: "mahasiswa",
      nim: "123461",
      status: "nonaktif",
    },
    {
      id: 7,
      name: "Michael Chang",
      email: "michael@example.com",
      role: "mahasiswa",
      nim: "123462",
      status: "aktif",
    },
    {
      id: 8,
      name: "Dewi Putri",
      email: "dewi@example.com",
      role: "mahasiswa",
      nim: "123463",
      status: "aktif",
    },
    {
      id: 9,
      name: "James Lee",
      email: "james@example.com",
      role: "mahasiswa",
      nim: "123464",
      status: "nonaktif",
    },
    {
      id: 10,
      name: "Siti Rahayu",
      email: "siti@example.com",
      role: "mahasiswa",
      nim: "123465",
      status: "aktif",
    },

    // Dosen
    {
      id: 11,
      name: "Dr. Jane Smith",
      email: "jane@example.com",
      role: "dosen",
      nip: "789012",
      status: "aktif",
    },
    {
      id: 12,
      name: "Prof. Bambang Wijaya",
      email: "bambang@example.com",
      role: "dosen",
      nip: "789013",
      status: "aktif",
    },
    {
      id: 13,
      name: "Dr. Robert Chen",
      email: "robert@example.com",
      role: "dosen",
      nip: "789014",
      status: "nonaktif",
    },
    {
      id: 14,
      name: "Dr. Sri Mulyani",
      email: "sri@example.com",
      role: "dosen",
      nip: "789015",
      status: "aktif",
    },
    {
      id: 15,
      name: "Prof. David Wilson",
      email: "david@example.com",
      role: "dosen",
      nip: "789016",
      status: "aktif",
    },
    {
      id: 16,
      name: "Dr. Ani Kusuma",
      email: "ani@example.com",
      role: "dosen",
      nip: "789017",
      status: "nonaktif",
    },
    {
      id: 17,
      name: "Prof. Lisa Wong",
      email: "lisa@example.com",
      role: "dosen",
      nip: "789018",
      status: "aktif",
    },
    {
      id: 18,
      name: "Dr. Hadi Prasetyo",
      email: "hadi@example.com",
      role: "dosen",
      nip: "789019",
      status: "aktif",
    },
    {
      id: 19,
      name: "Prof. Emma Brown",
      email: "emma@example.com",
      role: "dosen",
      nip: "789020",
      status: "nonaktif",
    },
    {
      id: 20,
      name: "Dr. Agus Supriyanto",
      email: "agus@example.com",
      role: "dosen",
      nip: "789021",
      status: "aktif",
    },

    // Pembimbing Instansi
    {
      id: 21,
      name: "Ir. Rudi Hartono",
      email: "rudi@company.com",
      role: "pembimbing",
      nip: "PI001",
      status: "aktif",
    },
    {
      id: 22,
      name: "Linda Wijaya, M.T.",
      email: "linda@company.com",
      role: "pembimbing",
      nip: "PI002",
      status: "aktif",
    },
    {
      id: 23,
      name: "Hendri Kusuma, S.T.",
      email: "hendri@company.com",
      role: "pembimbing",
      nip: "PI003",
      status: "nonaktif",
    },
    {
      id: 24,
      name: "Maya Putri, M.Sc.",
      email: "maya@company.com",
      role: "pembimbing",
      nip: "PI004",
      status: "aktif",
    },
    {
      id: 25,
      name: "Eko Prasetyo, B.Eng.",
      email: "eko@company.com",
      role: "pembimbing",
      nip: "PI005",
      status: "aktif",
    },
    {
      id: 26,
      name: "Diana Chen, M.B.A.",
      email: "diana@company.com",
      role: "pembimbing",
      nip: "PI006",
      status: "nonaktif",
    },
    {
      id: 27,
      name: "Arif Santoso, S.Kom.",
      email: "arif@company.com",
      role: "pembimbing",
      nip: "PI007",
      status: "aktif",
    },
    {
      id: 28,
      name: "Sari Indah, M.M.",
      email: "sari@company.com",
      role: "pembimbing",
      nip: "PI008",
      status: "aktif",
    },
    {
      id: 29,
      name: "Tony Wilson, Ph.D.",
      email: "tony@company.com",
      role: "pembimbing",
      nip: "PI009",
      status: "aktif",
    },
    {
      id: 30,
      name: "Rina Wati, M.Eng.",
      email: "rina@company.com",
      role: "kaprodi",
      nip: "PI010",
      status: "aktif",
    },
  ];

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Filter by role
    if (selectedRole !== "all") {
      result = result.filter((user) => user.role === selectedRole);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          (user.nim || user.nip).toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Special handling for nim/nip
        if (sortConfig.key === "nimNipNik") {
          aValue = a.nim || a.nip;
          bValue = b.nim || b.nip;
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [users, selectedRole, searchQuery, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Sort indicator component
  const SortIndicator = ({ column }) => {
    if (sortConfig.key !== column) {
      return <ChevronUp className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  // Modal Components
  const Modal = ({ title, onClose, children }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  const TableHeader = ({ label, column }) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center gap-1">
        {label}
        <SortIndicator column={column} />
      </div>
    </th>
  );

  const AddUserModal = () => (
    <Modal title="Tambah Akun Baru" onClose={() => setShowAddModal(false)}>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nama
          </label>
          <input type="text" className="mt-1 w-full border rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input type="email" className="mt-1 w-full border rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select className="mt-1 w-full border rounded-md p-2">
            {roles
              .filter((role) => role.id !== "all")
              .map((role) => (
                <option key={role.id} value={role.id}>
                  {role.label}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            NIM/NIP
          </label>
          <input type="text" className="mt-1 w-full border rounded-md p-2" />
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
          <p className="text-gray-600">
            Kelola semua akun pengguna dalam sistem
          </p>
        </div>

        {/* Filter and Search Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
          {/* Role Filter */}
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id);
                  setCurrentPage(1); // Reset to first page on filter change
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  selectedRole === role.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              <span>Tambah</span>
            </button>
          </div>
        </div>

        {/* Table */}
        {/* Desktop Table */}
<div className="overflow-x-auto bg-white rounded-lg shadow mt-3 hidden sm:block">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <TableHeader label="Nama" column="name" />
        <TableHeader label="Email" column="email" />
        <TableHeader label="Role" column="role" />
        <TableHeader label="NIM/NIP/NIK" column="nimNipNik" />
        <TableHeader label="Status" column="status" />
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Aksi
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {paginatedUsers.map((user) => (
        <tr key={user.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-500">{user.email}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
              {roles.find((r) => r.id === user.role)?.label}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {user.nim || user.nip}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                user.status === "aktif"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {user.status === "aktif" ? "Aktif" : "Nonaktif"}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex gap-2">
              <button
                onClick={() => setShowEditModal(true)}
                className="text-blue-600 hover:text-blue-900"
              >
                <Pencil className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-red-600 hover:text-red-900"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Mobile Cards */}
<div className="sm:hidden grid grid-cols-1 gap-4 mt-3">
  {paginatedUsers.map((user) => (
    <div key={user.id} className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold">{user.name}</h2>
      <p className="text-gray-500">{user.email}</p>
      <p>
        <span className="font-semibold">Role: </span>
        {roles.find((r) => r.id === user.role)?.label}
      </p>
      <p>
        <span className="font-semibold">NIM/NIP: </span>
        {user.nim || user.nip}
      </p>
      <p>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            user.status === "aktif"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.status === "aktif" ? "Aktif" : "Nonaktif"}
        </span>
      </p>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => setShowEditModal(true)}
          className="text-blue-600 hover:text-blue-900"
        >
          <Pencil className="h-5 w-5" />
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="text-red-600 hover:text-red-900"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  ))}
</div>


        {/* Modals */}
        {showAddModal && <AddUserModal />}
      </div>
    </div>
  );
};

export default ManageAccounts;
