import { Users, UserCheck, UserLock, Edit, Trash, Search, Filter, UserPlus, CheckCircle, Inspect } from "lucide-react"

export default function UserList() {

    const Accounts = [

        { id: 1, name: "Andry Ramariarison", email: "andry@gmail.com", status: "Accepted" },

        { id: 2, name: "Fetra Faneva", email: "faneva@gmail.com", status: "Pending" },

        { id: 3, name: "Cino Nomena", email: "cino@gmail.com", status: "Pending" },

        { id: 4, name: "Fiderana Antsa", email: "fiderana@gmail.com", status: "Accepted" },

        { id: 5, name: "Andry Ramariarison", email: "andry@gmail.com", status: "Accepted" },

        { id: 6, name: "Fetra Faneva", email: "faneva@gmail.com", status: "Pending" },

    ]

    return (
        <div className="flex flex-col">

            {/* header title */}

            <h2 className="ml-8 mt-4 font-semibold text-xl">User Statistics</h2>

            <p className="ml-8 mt-2 text-sm text-gray-500">
                Real-time overview of user engagement and growth
            </p>

            {/* cards stats */}

            <div className="mt-4 ml-4 mr-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">

                <div
                    className="relative shadow-sm flex items-center justify-between rounded-lg p-6 overflow-hidden"
                    style={{
                        backgroundImage: "url('/images/bg-card.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                
                    {/* Overlay pour lisibilité */}
                    <div className="absolute inset-0 bg-blue-600/40"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <p className="text-white text-sm font-semibold">Total Users</p>
                        <h2 className="text-3xl text-white font-bold mt-0.5">500</h2>
                    </div>

                    {/* Icon */}
                    <div className="relative z-10 p-4 bg-white/20 backdrop-blur-md text-white rounded-full">
                        <Users size={32} strokeWidth={2.5} />
                    </div>
                </div>

                <div
                    className="relative shadow-sm flex items-center justify-between rounded-lg p-6 overflow-hidden"
                    style={{
                        backgroundImage: "url('/images/bg-card.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-green-600/40"></div>

                    {/* Text */}
                    <div className="relative z-10">
                        <p className="text-white text-sm font-semibold">Validated Users</p>
                        <h2 className="text-3xl text-white font-bold mt-0.5">300</h2>
                    </div>

                    {/* Icon */}
                    <div className="relative z-10 p-4 bg-white/20 backdrop-blur-md text-white rounded-full">
                        <UserCheck size={32} strokeWidth={2.5} />
                    </div>
                </div>

                <div
                    className="relative shadow-sm flex items-center justify-between rounded-lg p-6 overflow-hidden"
                    style={{
                        backgroundImage: "url('/images/bg-card.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-red-600/40"></div>

                    {/* Text */}
                    <div className="relative z-10">
                        <p className="text-white text-sm font-semibold">Pending Users</p>
                        <h2 className="text-3xl text-white font-bold mt-0.5">100</h2>
                    </div>

                    {/* Icon */}
                    <div className="relative z-10 p-4 bg-white/20 backdrop-blur-md text-white rounded-full">
                        <UserLock size={32} strokeWidth={2.5} />
                    </div>
                </div>

            </div>

            {/* users list */}

            <div className="pt-4 px-8 flex items-end justify-between w-full">
                {/* Left side - Title */}
                <div>
                    <span className="text-gray-700 font-medium text-xl">
                        Accounts
                    </span>
                    <p className="mt-2 text-sm text-gray-500">
                        Showing all registered users in the system
                    </p>
                </div>

                {/* Right side - Search + Filter + Add */}
                <div className="flex gap-2">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        
                        <input
                            type="text"
                            placeholder="Rechercher un utilisateur..."
                            className="w-64 pl-9 pr-4 py-1.5 text-sm rounded-md border border-gray-300 
                                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                                    transition"
                        />
                    </div>

                    {/* Filter Button */}
                    <button
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm
                                bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                    >
                        <Filter className="w-4 h-4" />
                        <span className="hidden sm:inline">Filter</span>
                    </button>

                    {/* Add User Button */}
                    <button
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm
                                bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        <UserPlus className="w-4 h-4" />
                        <span className="hidden sm:inline">Add</span>
                    </button>
                </div>
            </div>

            <div className="mt-4 mx-4">

                <table className="w-full">

                    <thead>

                        <tr className="text-left border-b border-gray-300 text-gray-600 text-sm">

                            <th className="p-4">Id</th>

                            <th className="p-4">Name</th>

                            <th className="p-4">Email address</th>

                            <th className="text-center p-4">Status</th>

                            <th className="text-center p-4">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {Accounts.map((Account) => (

                            <tr key={Account.id} className="border-b border-gray-200 text-gray-600 text-sm">

                                <td className="font-semibold p-4">{Account.id}</td>

                                <td className="p-4">{Account.name}</td>

                                <td className="p-4">{Account.email}</td>

                                <td className="text-center align-middle">
                                    <span
                                        className={`font-semibold inline-block px-2 py-1 rounded-md text-xs
                                        ${Account.status === "Accepted"
                                        ? "text-emerald-600 border-2 border-emerald-100 bg-green-50 rounded-md"
                                        : "text-amber-600 border-2 border-amber-100 bg-amber-50 rounded-md"}`}
                                    >
                                        {Account.status}
                                    </span>
                                </td>

                                <td className="p-2">
                                    <div className="flex gap-3 justify-center items-center">

                                        <div>
                                            <Inspect size={16} strokeWidth={3} className="text-blue-400 cursor-pointer" />
                                        </div>

                                        {Account.status === "Accepted" && (
                                            <div>
                                                <Edit size={16} strokeWidth={3} className="text-emerald-400 cursor-pointer" />
                                            </div>
                                        )}

                                        {Account.status === "Pending" && (
                                            <div>
                                                <CheckCircle size={16} strokeWidth={3} className="text-emerald-400 cursor-pointer" />
                                            </div>
                                        )}

                                        <div>
                                            <Trash size={16} strokeWidth={3} className="text-red-400 cursor-pointer" />
                                        </div>

                                    </div>
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    )
}