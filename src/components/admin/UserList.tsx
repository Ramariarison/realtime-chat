import { Users, UserCheck, UserLock, Eye, Edit, Trash, Search, Filter, UserPlus, CheckCircle } from "lucide-react"

export default function UserList() {

    const Accounts = [

        { id: 1, name: "Andry Ramariarison", email: "andry@gmail.com", status: "Validated" },

        { id: 2, name: "Fetra Faneva", email: "faneva@gmail.com", status: "Pending" },

        { id: 3, name: "Cino Nomena", email: "cino@gmail.com", status: "Pending" },

        { id: 4, name: "Fiderana Antsa", email: "fiderana@gmail.com", status: "Validated" },

        { id: 5, name: "Andry Ramariarison", email: "andry@gmail.com", status: "Validated" },

        { id: 6, name: "Fetra Faneva", email: "faneva@gmail.com", status: "Pending" },

    ]

    return (
        <div className="flex flex-col">

            {/* header title */}

            <h2 className="ml-4 mt-4 font-semibold text-xl">User Statistics</h2>

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

            <div className="pt-4 px-4 flex items-center justify-between w-full">

                {/* Add User */}
                <button
                    className="flex items-center gap-2 px-4 py-2 rounded-md 
                            bg-blue-300 text-white hover:bg-blue-500 transition"
                >
                    <UserPlus className="w-5 h-5" />
                    <span className="hidden sm:inline">Ajouter</span>
                </button>

                {/* Search + Filter */}
            
                <div className="flex items-center gap-3 w-full max-w-xl">
                    
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        
                        <input
                            type="text"
                            placeholder="Rechercher un utilisateur..."
                            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 
                                    focus:outline-none focus:ring-1 focus:ring-blue-500 
                                    transition"
                        />
                    </div>

                    {/* Filter */}
                    <button
                        className="text-white flex items-center gap-2 px-4 py-2 rounded-md 
                        bg-blue-300 hover:bg-blue-500 transition"
                    >
                        <Filter className="w-5 h-5" />
                        <span className="hidden sm:inline">Filtrer</span>
                    </button>
                </div>
            
            </div>

            <div className="m-4">

                <table className="w-full">

                    <thead>

                        <tr className="text-left border-b text-white bg-blue-300">

                            <th className="text-center p-4">Identifier</th>

                            <th className="p-4">Name</th>

                            <th className="p-4">Email</th>

                            <th className="text-center p-4">Status</th>

                            <th className="text-center p-4">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {Accounts.map((Account) => (

                            <tr key={Account.id} className="border-b border-gray-200 text-gray-600 text-sm">

                                <td className="font-semibold text-center p-4">{Account.id}</td>

                                <td className="p-4">{Account.name}</td>

                                <td className="p-4">{Account.email}</td>

                                <td className="text-center align-middle">
                                    <span
                                        className={`font-semibold inline-block px-2 py-1 rounded-md text-sm
                                        ${Account.status === "Validated"
                                        ? "text-green-500"
                                        : "text-yellow-500"}`}
                                    >
                                        {Account.status}
                                    </span>
                                </td>

                                <td className="p-2">
                                    <div className="flex gap-1 justify-center">

                                        <div className="p-3 bg-blue-400 rounded-full cursor-pointer">
                                            <Eye size={14} strokeWidth={3} className="text-white" />
                                        </div>

                                        {Account.status === "Validated" && (
                                            <div className="p-3 bg-emerald-400 rounded-full cursor-pointer">
                                                <Edit size={14} strokeWidth={3} className="text-white" />
                                            </div>
                                        )}

                                        {Account.status === "Pending" && (
                                            <div className="p-3 bg-emerald-400 rounded-full cursor-pointer">
                                                <CheckCircle size={14} strokeWidth={3} className="text-white" />
                                            </div>
                                        )}

                                        <div className="p-3 bg-red-400 rounded-full cursor-pointer">
                                            <Trash size={14} strokeWidth={3} className="text-white" />
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