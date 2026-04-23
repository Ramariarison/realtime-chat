import { useState } from "react";
import SearchBar from "./SearchBar";
import ConversationItem from "./ConversationItem";
import type { Conversation } from "./types";

interface ConversationListProps {
  selectedId?: number | null;
  onSelect?: (id: number) => void;
}

export default function ConversationList({
  selectedId,
  onSelect,
}: ConversationListProps) {
  const [search, setSearch] = useState("");

  const conversations: Conversation[] = [
    {
      id: 1,
      name: "Alice Dupont",
      message: "Salut ! Tu as vu le dernier message ?",
      time: "14:32",
      unreadCount: 3,
      isOnline: true,
    },
    {
      id: 2,
      name: "Bob Martin",
      message: "Ça va ? On se voit demain ?",
      time: "13:15",
      isOnline: false,
    },
    {
      id: 3,
      name: "John Rakoto",
      message: "Hello Le projet avance bien",
      time: "11:50",
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: 4,
      name: "Sophie Razafy",
      message: "Merci pour ton aide hier !",
      time: "Hier",
      isOnline: false,
    },
  ];

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-80 md:w-96 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Conversations</h2>
          <div className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
            {filteredConversations.length} chats
          </div>
        </div>

        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Liste */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isActive={selectedId === conv.id}
              onClick={() => onSelect?.(conv.id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <p className="text-sm">Aucune conversation trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}