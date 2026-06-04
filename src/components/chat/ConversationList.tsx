import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ConversationItem from "./ConversationItem";
import type { Conversation } from "../../types/types";
import { getConversations } from "../../services/ConversationService";

interface ConversationListProps {
    token: string;
    selected: Conversation | null;
    onSelect: (conv: Conversation) => void;
}

export default function ConversationList({
    token,
    selected,
    onSelect,
}: ConversationListProps) {
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    const [conversations, setConversations] = useState<Conversation[]>([]);

    const fetchConversations = async () => {
        try {
            setLoading(true);

            const response = await getConversations(token);

            setConversations(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConversations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredConversations = conversations.filter((conversation) =>
        conversation.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="w-80 md:w-96 bg-white border-r border-gray-200 flex flex-col h-full">
            {/* Header */}
            <div className="p-4 bg-white sticky top-0 z-10">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Conversations
                    </h2>

                    <div className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                        {filteredConversations.length} chats
                    </div>
                </div>

                <SearchBar
                    value={search}
                    onChange={setSearch}
                />
            </div>

            {/* Liste */}
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        Chargement...
                    </div>
                ) : filteredConversations.length > 0 ? (
                    filteredConversations.map((conv) => (
                        <ConversationItem
                            key={conv.id}
                            conversation={conv}
                            isActive={selected?.id === conv.id}
                            onClick={() => onSelect(conv)}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <p className="text-sm">
                            No conversation found
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}