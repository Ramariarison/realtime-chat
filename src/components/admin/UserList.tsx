import {
    Edit,
    Trash,
    Search,
    Filter,
    UserPlus,
    CheckCircle,
    Loader2,
    Check,
    X
} from "lucide-react";

import { useUsersList } from "../../hooks/useUsersList";
import UserModal from "../modal/UserModal";
import AddUserModal from "../modal/AddUserModal";

export default function UserList() {

    const { 
        message,
        showMessage,
        setShowMessage,
        loading,
        setSearch,
        statusFilter,
        setStatusFilter,
        filteredUsers,
        handleValideUser,
        handleDeleteUser,
        isModalOpen,
        userSelected,
        handleOpenModal,
        handleCloseModal,
        fetchData,
        isAddModalOpen,
        handleOpenAddModal,
        handleCloseAddModal
     } = useUsersList();

    return (

        <div className="flex flex-col bg-gray-100 h-screen">

            {/* Modal */}
            {isModalOpen && userSelected && (
                <UserModal
                    user={userSelected}
                    onClose={handleCloseModal}
                    fetchData={fetchData}
                />
            )}

            {/* Add user modal */}
            {isAddModalOpen && (
                <AddUserModal 
                    onClose={handleCloseAddModal}
                    fetchData={fetchData}
                />
            )}

            {/* Toast notification de succés */}
            <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
                showMessage ? 'translate-y-4 opacity-100' : '-translate-y-full opacity-0'
            }`}>
                <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]">
                
                    <Check className="w-5 h-5 flex-shrink-0" />

                    <span className="text-sm font-medium">
                        {message}
                    </span>

                    <button
                        onClick={() => setShowMessage(false)}
                        className="ml-auto hover:bg-green-600 rounded-full p-1 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>

                </div>
            </div>

            {/* Users list */}

            <div className="pt-4 px-8 flex items-end justify-between w-full">

                <div>

                    <span className="text-gray-700 font-medium text-xl">
                        Accounts
                    </span>

                    <p className="mt-2 text-sm text-gray-500">
                        Showing all registered users in the system
                    </p>

                </div>

                <div className="flex gap-2">

                    <div className="relative">

                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

                        <input
                            type="text"
                            placeholder="Rechercher un utilisateur..."
                            className="w-64 pl-9 pr-4 py-1.5 text-sm rounded-md border border-gray-300 
                            focus:outline-none focus:ring-1 focus:ring-blue-500
                            focus:border-blue-500 transition"
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <button
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm
                        bg-white text-gray-700 hover:bg-gray-200 transition"
                    >

                        <Filter strokeWidth={3} className="w-4 h-4" />

                        {/* 
                        <span className="hidden sm:inline">
                            Filter
                        </span>
                        */}
                        <select 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="outline-none font-semibold"   
                        >
                            <option value="All">All</option>
                            <option value="1">Validated</option>
                            <option value="0">Pending</option>
                        </select>

                    </button>

                    <button
                        onClick={handleOpenAddModal}
                        className="flex font-semibold items-center gap-2 px-3 py-1.5 rounded-md text-sm
                        bg-blue-600 text-white hover:bg-blue-700 transition"
                    >

                        <UserPlus strokeWidth={3} className="w-4 h-4" />

                        <span className="hidden sm:inline">
                            Add
                        </span>

                    </button>

                </div>

            </div>

            {/* Table */}

            <div className="flex-1 mt-4 mx-4 mb-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">

                {loading ? (

                    <div className="flex justify-center items-center flex-1">

                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />

                    </div>

                ) : (

                    <div className="flex-1 overflow-y-auto custom-scrollbar">

                        <table className="w-full border-collapse">

                            <thead className="sticky top-0 z-20 bg-gray-50 backdrop-blur-sm">

                                <tr className="border-b border-gray-200 text-gray-600 text-sm">

                                    <th className="text-center px-6 py-4 font-semibold">
                                        Profile
                                    </th>

                                    <th className="text-center px-6 py-4 font-semibold">
                                        Name
                                    </th>

                                    <th className="text-center px-6 py-4 font-semibold">
                                        Email address
                                    </th>

                                    <th className="text-center px-6 py-4 font-semibold">
                                        Status
                                    </th>

                                    <th className="text-center px-6 py-4 font-semibold">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredUsers.map((user) => (

                                    <tr
                                        key={user.id}
                                        className="border-b border-gray-100 text-sm text-gray-600 hover:bg-blue-50/40 transition-all duration-200"
                                    >

                                        <td className="py-3">

                                            <div className="flex justify-center items-center">

                                                <img
                                                    className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-md"
                                                    src={`http://127.0.0.1:8000/storage/${user.avatar}`}
                                                    alt={user.name}
                                                />

                                            </div>

                                        </td>

                                        <td className="text-center px-6 py-4 font-medium">
                                            {user.name}
                                        </td>

                                        <td className="text-center px-6 py-4 text-gray-500">
                                            {user.email}
                                        </td>

                                        <td className="text-center px-6 py-4">

                                            <span
                                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold
                                                ${user.status === 1
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-amber-50 text-amber-600"}`}
                                            >

                                                <div
                                                    className={`w-2 h-2 rounded-full
                                                    ${user.status === 1
                                                    ? "bg-emerald-500"
                                                    : "bg-amber-500"}`}
                                                />

                                                {user.status === 1
                                                    ? "Validated"
                                                    : "Pending"}

                                            </span>

                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex justify-center items-center gap-4">

                                                {user.status === 1 && (

                                                    <Edit
                                                        onClick={() => handleOpenModal(user)}
                                                        size={17}
                                                        strokeWidth={2.5}
                                                        className="text-emerald-500 cursor-pointer hover:scale-125 hover:text-emerald-600 transition-all duration-200"
                                                    />

                                                )}

                                                {user.status === 0 && (

                                                    <CheckCircle
                                                        size={17}
                                                        strokeWidth={2.5}
                                                        className="text-emerald-500 cursor-pointer hover:scale-125 hover:text-emerald-600 transition-all duration-200"
                                                        onClick={() => handleValideUser(user.id)}
                                                    />

                                                )}

                                                <Trash
                                                    size={17}
                                                    strokeWidth={2.5}
                                                    className="text-red-400 cursor-pointer hover:scale-125 hover:text-red-500 transition-all duration-200"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                />

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}