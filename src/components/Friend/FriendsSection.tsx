import { Search } from "lucide-react";

export default function FriendsSection() {
    return (
        <div className="flex flex-col">

            {/* Zone de saisie */}
            <div className="flex items-center rounded-md px-3 py-1.25 shadow-sm m-4 bg-black/5 backdrop-blur-sm">
                <input
                    type="text"
                    placeholder="type the name to search"
                    className="flex-1 bg-transparent text-purple-500 placeholder-purple-500 outline-none pr-10"
                />

                <div className="flex items-center gap-3">
                    <button 
                        className="group flex items-center justify-center w-11 h-11 
                        bg-linear-to-br from-violet-600 via-purple-600 to-indigo-600 
                        hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500
                        active:scale-95 transition-all duration-200 
                        rounded-full shadow-lg shadow-purple-500/30
                        hover:shadow-xl hover:shadow-purple-500/40
                        focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        <Search 
                            size={20} 
                            className="text-white transition-transform group-active:rotate-45" 
                        />
                    </button>
                </div>
            </div>

            <div className="mx-4 flex items-center gap-3 px-4 py-3.5 bg-gray-50 cursor-pointer transition-all duration-200 border-l-4 border-gray-200">
                {/* Avatar + Statut en ligne */}
                <div className="relative shrink-0">
                    <img
                        src="/images/profile.jpg"
                        className="w-12 h-12 rounded-full object-cover ring-1 ring-gray-100"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between">
                        <div className="font-semibold text-sm/6 text-gray-900 truncate">
                            Francia Nomena
                        </div>

                        <div className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            <button className="px-3 py-2 bg-purple-400 text-white rounded-2xl">
                                message
                            </button>
                        </div>
                    </div>

                    <div className="text-xs font-semibold text-gray-600 truncate flex-1">
                        En ligne
                    </div>

                </div>
            </div>
        </div>
    )
}