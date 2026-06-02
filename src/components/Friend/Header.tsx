export default function Header({ active, setActive }) {

    return (
        <div className="flex flex-col">
            {/* Titre */}
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">Friends</h2>
                <span className="text-sm font-semibold text-purple-400">6 friends in sum</span>
            </div>

            {/* Les sections */}
            <div className="pl-4 pr-4 grid grid-cols-3 gap-2 font-semibold">
                <button
                    onClick={() => setActive('friends')}
                    className={`p-3 rounded-md border-2 transition-all duration-200 ${
                        active === 'friends'
                            ? 'bg-purple-400 text-white border-purple-400 shadow-lg'
                            : 'border-purple-400 text-purple-400 hover:bg-purple-50'
                    }`}
                >
                    Friends
                </button>

                <button
                    onClick={() => setActive('requests')}
                    className={`p-3 rounded-md border-2 transition-all duration-200 ${
                        active === 'requests'
                            ? 'bg-purple-400 text-white border-purple-400 shadow-lg'
                            : 'border-purple-400 text-purple-400 hover:bg-purple-50'
                    }`}
                >
                    Friend requests
                </button>

                <button
                    onClick={() => setActive('find')}
                    className={`p-3 rounded-md border-2 transition-all duration-200 ${
                        active === 'find'
                            ? 'bg-purple-400 text-white border-purple-400 shadow-lg'
                            : 'border-purple-400 text-purple-400 hover:bg-purple-50'
                    }`}
                >
                    Invite friend
                </button>
            </div>
        </div>
    );
}