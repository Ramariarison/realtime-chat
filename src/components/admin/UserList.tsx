import {
    Edit,
    Trash,
    Search,
    Filter,
    UserPlus,
    CheckCircle,
    Inspect,
    Loader2,
    Check,
    X
} from "lucide-react";

import { useEffect, useState } from "react";
import { destroy, getUsers, valideUser } from "../../services/userService";

export default function UserList() {

    type User = {
        id: number;
        avatar: string;
        name: string;
        email: string;
        status: number
    };

    const [users, setUsers] = useState<User[]>([]);

    const [message, setMessage] = useState('');

    const [showMessage, setShowMessage] = useState(false);

    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    // Fetch global
    const fetchData = async () => {

        setLoading(true);

        try {

            // Users
            const usersResponse = await getUsers(token);
            setUsers(usersResponse.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    // Initial loading
    useEffect(() => {
        fetchData();
    }, []);

    // Validate user
    const handleValideUser = async (userId: number) => {

        try {

            const response = await valideUser(userId, token);

            if (response && response.message) {
                setMessage(response.message);
            }

            setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false);
            }, 3000);

            await fetchData();

        } catch (error) {

            console.error(error);
        }
    }

    // Supprimer utilisateur
    const handleDeleteUser = async (userId: number) => {

        try {

            const response = await destroy(userId, token);

            if(response && response.message) {
                setMessage(response.message);
            }

            setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false);
            }, 3000);

            await fetchData();

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="flex flex-col h-screen overflow-hidden">

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
                        />

                    </div>

                    <button
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm
                        bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                    >

                        <Filter className="w-4 h-4" />

                        <span className="hidden sm:inline">
                            Filter
                        </span>

                    </button>

                    <button
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm
                        bg-blue-600 text-white hover:bg-blue-700 transition"
                    >

                        <UserPlus className="w-4 h-4" />

                        <span className="hidden sm:inline">
                            Add
                        </span>

                    </button>

                </div>

            </div>

            {/* Table */}

            <div className="mt-4 mx-4 flex-1 overflow-y-auto">

                {loading ? (

                    <div className="flex justify-center items-center h-64">

                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />

                    </div>

                ) : (

                    <table className="w-full">

                        <thead className="sticky top-0 bg-white z-10">

                            <tr className="text-left border-b border-gray-300 text-gray-600 text-sm">

                                <th className="text-center p-4">
                                    Profile
                                </th>

                                <th className="text-center p-4">
                                    Name
                                </th>

                                <th className="text-center p-4">
                                    Email address
                                </th>

                                <th className="text-center p-4">
                                    Status
                                </th>

                                <th className="text-center p-4">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.map((user) => (

                                <tr
                                    key={user.id}
                                    className="border-b border-gray-200 text-gray-600 text-sm"
                                >

                                    <td className="p-3 align-middle">

                                        <div className="flex justify-center items-center">

                                            <img
                                                className="w-10 h-10 rounded-full ring-2 ring-blue-300 object-cover"
                                                src={`http://127.0.0.1:8000/storage/${user.avatar}`}
                                                alt={user.name}
                                            />

                                        </div>

                                    </td>

                                    <td className="text-center p-4">
                                        {user.name}
                                    </td>

                                    <td className="text-center p-4">
                                        {user.email}
                                    </td>

                                    <td className="text-center align-middle">

                                        <span
                                            className={`font-semibold inline-block px-2 py-1 rounded-md text-xs
                                            ${user.status === 1
                                            ? "text-emerald-600 border-2 border-emerald-100 bg-green-50"
                                            : "text-amber-600 border-2 border-amber-100 bg-amber-50"}`}
                                        >

                                            {user.status === 1
                                                ? "Validated"
                                                : "Pending"}

                                        </span>

                                    </td>

                                    <td className="p-2">

                                        <div className="flex gap-3 justify-center items-center">

                                            <Inspect
                                                size={16}
                                                strokeWidth={3}
                                                className="text-blue-400 cursor-pointer"
                                            />

                                            {user.status === 1 && (

                                                <Edit
                                                    size={16}
                                                    strokeWidth={3}
                                                    className="text-emerald-400 cursor-pointer"
                                                />

                                            )}

                                            {user.status === 0 && (

                                                <CheckCircle
                                                    size={16}
                                                    strokeWidth={3}
                                                    className="text-emerald-400 cursor-pointer"
                                                    onClick={() => handleValideUser(user.id)}
                                                />

                                            )}

                                            <Trash
                                                size={16}
                                                strokeWidth={3}
                                                className="text-red-400 cursor-pointer"
                                                onClick={() => handleDeleteUser(user.id)}
                                            />

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </div>
    );
}