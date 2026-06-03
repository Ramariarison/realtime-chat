import { Clock10Icon } from "lucide-react"

import { acceptFriendRequest, declineFriendRequest, getFriendRequests } from "../../services/friendService";

import { useEffect, useState } from "react";

interface FriendRequest {
    id: number;
    user_id: number;
    name: string;
    email: string;
    avatar: string | null;
    created_at: string;
}

export default function RequestSection({ token }) {

    const [requests, setRequests] = useState<FriendRequest[]>([]);

    useEffect(() => {
        console.log("useEffect exécuté");

        loadRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadRequests = async () => {
        try {
            console.log("Loading requests...");

            const response = await getFriendRequests(token);

            console.log("API Response:", response);

            setRequests(response.data ?? response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAccept = async (
        userId: number
    ) => {
        try {
            await acceptFriendRequest(
                userId,
                token
            );

            setRequests((prev) =>
                prev.filter(
                    (request) =>
                        request.user_id !== userId
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleDecline = async (
        userId: number
    ) => {
        try {
            await declineFriendRequest(
                userId,
                token
            );

            setRequests((prev) =>
                prev.filter(
                    (request) =>
                        request.user_id !== userId
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="p-4">
                <h2 className="text-sm text-purple-500 font-semibold">Friend requests</h2>
            </div>

            <div className="mx-4 grid grid-cols-2 gap-2">
                {requests.map((request) => (
                    <div
                        key={request.id}
                        className="h-40 p-4 flex flex-col justify-between bg-purple-300 rounded-md"
                    >
                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 rounded-full">
                                    <img
                                        src={`http://localhost:8000/storage/${request.avatar}`}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-white text-sm">
                                        {request.name}
                                    </span>

                                    <div className="text-xs font-semibold text-gray-500 truncate">
                                        {request.email}
                                    </div>
                                </div>
                            </div>

                            <div className="text-white">
                                <Clock10Icon />
                            </div>
                        </div>

                        <div className="flex text-white font-semibold text-sm gap-2">

                            <button
                                onClick={() =>
                                    handleAccept(
                                        request.user_id
                                    )
                                }
                                className="w-full py-3 bg-purple-400 hover:bg-purple-500 rounded-md"
                            >
                                Accept
                            </button>

                            <button
                                onClick={() =>
                                    handleDecline(
                                        request.user_id
                                    )
                                }
                                className="w-full py-3 bg-transparent border border-purple-500 hover:border-white rounded-md"
                            >
                                Decline
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}