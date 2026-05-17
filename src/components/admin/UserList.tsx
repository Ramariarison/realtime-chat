import {
    Users,
    UserCheck,
    UserLock,
    Edit,
    Trash,
    Search,
    Filter,
    UserPlus,
    CheckCircle,
    Inspect,
    Loader2
} from "lucide-react";

import { useEffect, useState } from "react";
import { getStats, getUsers, valideUser } from "../../services/userService";

export default function UserList() {

    type User = {
        id: number;
        avatar: string;
        name: string;
        email: string;
        status: number
    };

    const [users, setUsers] = useState<User[]>([]);

    const [sum, setSum] = useState<number>();
    const [sumValidated, setSumValidated] = useState<number>();
    const [sumPending, setSumPending] = useState<number>();

    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    // Fetch global
    const fetchData = async () => {

        setLoading(true);

        try {

            // Users
            const usersResponse = await getUsers(token);
            setUsers(usersResponse.data);

            // Stats
            const statsResponse = await getStats(token);

            setSum(statsResponse.sumUsers);
            setSumValidated(statsResponse.sumValidatedUsers);
            setSumPending(statsResponse.sumPendingUsers);

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

            await fetchData();

            alert('User validated successfully!');

        } catch (error) {

            console.error('Erreur lors de la validation:', error);

            setMessage('Failed to validate user');

            alert('Error validating user');
        }
    }

    return (

        <div className="flex flex-col overflow-auto">

            {/* Header */}

            <h2 className="ml-8 mt-4 font-semibold text-xl">
                User Statistics
            </h2>

            <p className="ml-8 mt-2 text-sm text-gray-500">
                Real-time overview of user engagement and growth
            </p>

            {/* Stats cards */}

            <div className="mt-4 ml-4 mr-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">

                {/* Total users */}

                <div
                    className="relative shadow-sm flex items-center justify-between rounded-lg p-6 overflow-hidden"
                    style={{
                        backgroundImage: "url('/images/bg-card.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >

                    <div className="absolute inset-0 bg-blue-600/40"></div>

                    <div className="relative z-10">

                        <p className="text-white text-sm font-semibold">
                            Total Users
                        </p>

                        {loading ? (

                            <div className="h-8 w-20 mt-2 rounded bg-white/30 animate-pulse"></div>

                        ) : (

                            <h2 className="text-3xl text-white font-bold mt-0.5">
                                {sum}
                            </h2>

                        )}

                    </div>

                    <div className="relative z-10 p-4 bg-white/20 backdrop-blur-md text-white rounded-full">
                        <Users size={32} strokeWidth={2.5} />
                    </div>

                </div>

                {/* Validated users */}

                <div
                    className="relative shadow-sm flex items-center justify-between rounded-lg p-6 overflow-hidden"
                    style={{
                        backgroundImage: "url('/images/bg-card.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >

                    <div className="absolute inset-0 bg-green-600/40"></div>

                    <div className="relative z-10">

                        <p className="text-white text-sm font-semibold">
                            Validated Users
                        </p>

                        {loading ? (

                            <div className="h-8 w-20 mt-2 rounded bg-white/30 animate-pulse"></div>

                        ) : (

                            <h2 className="text-3xl text-white font-bold mt-0.5">
                                {sumValidated}
                            </h2>

                        )}

                    </div>

                    <div className="relative z-10 p-4 bg-white/20 backdrop-blur-md text-white rounded-full">
                        <UserCheck size={32} strokeWidth={2.5} />
                    </div>

                </div>

                {/* Pending users */}

                <div
                    className="relative shadow-sm flex items-center justify-between rounded-lg p-6 overflow-hidden"
                    style={{
                        backgroundImage: "url('/images/bg-card.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >

                    <div className="absolute inset-0 bg-red-600/40"></div>

                    <div className="relative z-10">

                        <p className="text-white text-sm font-semibold">
                            Pending Users
                        </p>

                        {loading ? (

                            <div className="h-8 w-20 mt-2 rounded bg-white/30 animate-pulse"></div>

                        ) : (

                            <h2 className="text-3xl text-white font-bold mt-0.5">
                                {sumPending}
                            </h2>

                        )}

                    </div>

                    <div className="relative z-10 p-4 bg-white/20 backdrop-blur-md text-white rounded-full">
                        <UserLock size={32} strokeWidth={2.5} />
                    </div>

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

            <div className="mt-4 mx-4 max-h-100 overflow-y-auto">

                {loading ? (

                    <div className="flex justify-center items-center h-64">

                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />

                    </div>

                ) : (

                    <table className="w-full">

                        <thead className="sticky top-0 bg-white z-10">

                            <tr className="text-left border-b border-gray-300 text-gray-600 text-sm">

                                <th className="text-center p-4">Profile</th>
                                <th className="text-center p-4">Name</th>
                                <th className="text-center p-4">Email address</th>
                                <th className="text-center p-4">Status</th>
                                <th className="text-center p-4">Actions</th>

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

                                            {user.status === 1 ? "Validated" : "Pending"}

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