import { ClockArrowUp } from "lucide-react"

export default function RequestSection() {
    return (
        <div>
            <div className="p-4">
                <h2 className="text-sm text-purple-500 font-semibold">Friend requests</h2>
            </div>

            <div className="mx-4 grid grid-cols-2 gap-2">

                <div className="h-40 p-4 flex flex-col justify-between bg-purple-300 rounded-md">
                    {/* Avatar + Nom */}
                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2">
                            <div className="w-12 h-12 rounded-full">
                                <img 
                                    className="w-full h-full rounded-full object-cover"
                                    src="/images/Rudd.jpg"
                                />
                            </div>

                            <span className="font-semibold text-white text-sm">
                                Francia Nomena
                            </span>
                        </div>

                        <div className="text-white flex flex-col gap-1 items-center">
                            <ClockArrowUp />
                            <span className="text-xs font-semibold">6 min</span>
                        </div>
                        
                    </div>

                    {/* Boutons */}
                    <div className="flex text-white font-semibold text-sm gap-2">
                        <button className="w-full py-3 bg-purple-400 hover:bg-purple-500 rounded-md cursor-pointer">
                            Accept
                        </button>

                        <button className="w-full py-3 bg-transparent border border-purple-500 hover:border-white rounded-md cursor-pointer">
                            Decline
                        </button>
                    </div>

                </div>

                <div className="h-40 p-4 flex flex-col justify-between bg-purple-300 rounded-md">
                    {/* Avatar + Nom */}
                    <div className="flex items-center gap-2 justify-between">

                        <div className="flex items-center gap-2">
                            <div className="w-12 h-12 rounded-full">
                                <img 
                                    className="w-full h-full rounded-full object-cover"
                                    src="/images/emily.jpg"
                                />
                            </div>

                            <span className="font-semibold text-white text-sm">
                                Laurène Mitia
                            </span>
                        </div>

                        <div className="text-white flex flex-col gap-1 items-center">
                            <ClockArrowUp />
                            <span className="text-xs font-semibold">6 min</span>
                        </div>
                        
                    </div>

                    {/* Boutons */}
                    <div className="flex text-white font-semibold text-sm gap-2">
                        <button className="w-full py-3 bg-purple-400 hover:bg-purple-500 rounded-md cursor-pointer">
                            Accept
                        </button>

                        <button className="w-full py-3 bg-transparent border border-purple-500 hover:border-white rounded-md cursor-pointer">
                            Decline
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}