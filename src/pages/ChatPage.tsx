import { useState } from "react";

import ConversationList from "../components/chat/ConversationList";
import ChatWindow from "../components/chat/ChatWindow";
import type { Conversation } from "../types/types";

export default function ChatPage() {

    const [selectedConversation, setSelectedConversation] =
        useState<Conversation | null>();

    const token = localStorage.getItem("token") || "";

    return (
        <div className="flex h-full overflow-hidden">

            <ConversationList
                token={token}
                selected={selectedConversation}
                onSelect={setSelectedConversation}
            />

            <div className="flex-1 flex flex-col bg-transparent min-w-0">

                {selectedConversation ? (

                    <ChatWindow
                        token={token}
                        conversation={selectedConversation}
                    />

                ) : (

                    <div className="flex-1 flex items-center justify-center text-gray-400">

                        <div className="text-center">

                            <div className="text-6xl mb-4">
                                💬
                            </div>

                            <h3 className="text-xl font-medium text-gray-600 mb-1">
                                Select a conversation
                            </h3>

                            <p className="text-sm">
                                Start chatting with your contacts
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}