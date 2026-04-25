import type { Conversation } from "./types";

interface ConversationItemProps {
  conversation: Conversation;
  isActive?: boolean;
  onClick?: () => void;
}

export default function ConversationItem({
  conversation,
  isActive = false,
  onClick,
}: ConversationItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 cursor-pointer transition-all duration-200 border-l-4 ${
        isActive
          ? "bg-blue-50 border-blue-600"
          : "border-transparent hover:border-gray-200"
      }`}
    >
      {/* Avatar + Statut en ligne */}
      <div className="relative flex-shrink-0">
        <img
          src={conversation.avatar || `https://i.pravatar.cc/48?u=${conversation.id}`}
          alt={conversation.name}
          className="w-12 h-12 rounded-full object-cover ring-1 ring-gray-100"
        />
        {conversation.isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between">
          <div className="font-semibold text-sm/6 text-gray-900 truncate">
            {conversation.name}
          </div>
          <div className="text-xs text-gray-500 whitespace-nowrap ml-2">
            {conversation.time}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-0.5">
          <div className="text-sm text-gray-600 truncate flex-1">
            {conversation.message}
          </div>

          {conversation.unreadCount && conversation.unreadCount > 0 && (
            <div className="bg-blue-600 text-white text-[10px] font-medium px-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
              {conversation.unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}