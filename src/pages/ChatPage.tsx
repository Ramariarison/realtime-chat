// src/pages/ChatPage.tsx
import { useState } from "react";
import ConversationList from "../components/chat/ConversationList";
import ChatWindow from "../components/chat/ChatWindow";

export default function ChatPage() {
  const [selectedId, setSelectedId] = useState<number | null>(1);

  return (
    <div className="flex h-full overflow-hidden">
      <ConversationList 
        selectedId={selectedId} 
        onSelect={setSelectedId} 
      />

      <div className="flex-1 flex flex-col bg-gray-50 min-w-0">
        {selectedId ? (
          <ChatWindow conversationId={selectedId} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-medium text-gray-600 mb-1">
                Sélectionnez une conversation
              </h3>
              <p className="text-sm">Commencez à discuter avec vos contacts</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}