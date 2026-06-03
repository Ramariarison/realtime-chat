import { Search } from "lucide-react";
import { useState } from "react";
import { searchUsers, sendFriendInvitation } from "../../services/friendService";

interface SearchUser {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    friendship_status: "friend" | "pending" | "none";
}

interface InviteSectionProps {
    token: string;
}

export default function InviteSection({
    token,
}: InviteSectionProps) {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<SearchUser[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) {
            setUsers([]);
            return;
        }

        try {
            setLoading(true);

            const response = await searchUsers(
                query,
                token
            );

            setUsers(response.data ?? response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInvite = async (userId: number) => {
        try {
            await sendFriendInvitation(
                userId,
                token
            );

            setUsers((prev) =>
                prev.map((user) =>
                    user.id === userId
                        ? {
                              ...user,
                              friendship_status: "pending",
                          }
                        : user
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="p-4">
                <h2 className="text-sm text-purple-500 font-semibold mb-4">
                    Search someone by his name or email
                </h2>

                {/* Recherche */}
                <div className="flex items-center rounded-md px-3 py-1.5 shadow-sm bg-black/5 backdrop-blur-sm">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) =>
                            setQuery(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        placeholder="name or email"
                        className="flex-1 bg-transparent text-purple-500 placeholder-purple-500 outline-none pr-10"
                    />

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSearch}
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

                {/* Loading */}
                {loading && (
                    <div className="mt-4 text-center text-sm text-gray-500">
                        Searching...
                    </div>
                )}

                {/* Résultats */}
                <div className="mt-4 space-y-2 max-h-120 overflow-y-auto pr-2">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="mx-1 flex items-center gap-3 px-4 py-3.5 bg-gray-50 transition-all duration-200 border-l-4 border-purple-300 rounded-r-lg"
                        >
                            {/* Avatar */}
                            <div className="relative shrink-0">
                                <img
                                    src={`http://localhost:8000/storage/${user.avatar}`}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full object-cover ring-1 ring-gray-100"
                                />

                                <div
                                    className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 border-2 border-white rounded-full ${
                                        user.friendship_status ===
                                        "friend"
                                            ? "bg-green-500"
                                            : user.friendship_status ===
                                              "pending"
                                            ? "bg-yellow-500"
                                            : "bg-gray-400"
                                    }`}
                                />
                            </div>

                            {/* Informations */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-baseline justify-between">
                                    <div className="font-semibold text-sm text-gray-900 truncate">
                                        {user.name}
                                    </div>

                                    <div className="ml-2">
                                        {user.friendship_status ===
                                            "none" && (
                                            <button
                                                onClick={() =>
                                                    handleInvite(
                                                        user.id
                                                    )
                                                }
                                                className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl text-xs"
                                            >
                                                Add Friend
                                            </button>
                                        )}

                                        {user.friendship_status ===
                                            "pending" && (
                                            <button
                                                disabled
                                                className="px-3 py-2 bg-yellow-500 text-white rounded-2xl text-xs cursor-not-allowed"
                                            >
                                                Pending
                                            </button>
                                        )}

                                        {user.friendship_status ===
                                            "friend" && (
                                            <button
                                                disabled
                                                className="px-3 py-2 bg-green-500 text-white rounded-2xl text-xs cursor-not-allowed"
                                            >
                                                Friend
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="text-xs text-gray-500 truncate">
                                    {user.email}
                                </div>

                                <div className="text-xs font-semibold text-gray-600 truncate">
                                    {user.friendship_status ===
                                        "friend" &&
                                        "Already friends"}

                                    {user.friendship_status ===
                                        "pending" &&
                                        "Invitation pending"}

                                    {user.friendship_status ===
                                        "none" &&
                                        "Not connected"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}