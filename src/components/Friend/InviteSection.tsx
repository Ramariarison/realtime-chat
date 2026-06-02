import { Search } from "lucide-react";

export default function InviteSection() {
    return (
        <div>
            <div className="p-4">
                <h2 className="text-sm text-purple-500 font-semibold mb-4">
                    Search someone by his name or email
                </h2>

                {/* Zone de saisie */}
                <div className="flex items-center rounded-md px-3 py-1.25 shadow-sm bg-black/5 backdrop-blur-sm">
                    <input
                        type="text"
                        placeholder="name or email"
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
            </div>
        </div>
    )
}