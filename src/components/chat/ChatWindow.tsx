import { Paperclip, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
    getMessages,
    sendMessage,
} from "../../services/ConversationService";

import type {
    Message,
    Conversation,
} from "../../types/types";

import { useAuth } from "../../hooks/useAuth";

interface ChatWindowProps {
    conversation: Conversation | null;
    token: string;
}

export default function ChatWindow({
    conversation,
    token,
}: ChatWindowProps) {

    const { user } = useAuth();

    const [messages, setMessages] =
        useState<Message[]>([]);

    const [content, setContent] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const messagesEndRef =
        useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        if (conversation) {
            loadMessages();
        }

    }, [conversation]);

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);

    const loadMessages = async () => {

        if (!conversation) return;

        try {

            setLoading(true);

            const response =
                await getMessages(
                    conversation.id,
                    token
                );

            setMessages(response);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    const handleSend = async () => {

        if (!conversation || !content.trim()) {
            return;
        }

        try {

            const response =
                await sendMessage(
                    conversation.id,
                    content,
                    token
                );

            setMessages((prev) => [
                ...prev,
                response,
            ]);

            setContent("");

        } catch (error) {

            console.error(error);

        }
    };

    if (!conversation) {
        return null;
    }

    return (
        <div className="relative flex flex-col flex-1 overflow-hidden min-w-0">

            {/* Header */}
            <div className="bg-white px-6 py-4">

                <div className="flex items-center gap-3">

                    <div className="relative">

                        <img
                            src={`http://localhost:8000/storage/${conversation.avatar}`}
                            alt={conversation.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />

                    </div>

                    <div>

                        <h2 className="font-semibold text-gray-900">
                            {conversation.name}
                        </h2>

                        <p className="text-xs font-medium text-green-600">
                            Online
                        </p>

                    </div>

                </div>

            </div>

            {/* Messages */}
            <div
                className="
                    flex-1
                    overflow-y-auto
                    px-6
                    py-5
                    pb-32
                    space-y-4
                "
                style={{
                    backgroundImage:
                        "url('/images/Pochita.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >

                {loading ? (

                    <div className="text-center text-white font-medium">
                        Loading messages...
                    </div>

                ) : (

                    messages.map((msg) => {

                        const isMine =
                            msg.user_id === user?.id;

                        return (

                            <div
                                key={msg.id}
                                className={`flex ${
                                    isMine
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >

                                <div
                                    className={`
                                        max-w-[75%]
                                        px-4
                                        py-3
                                        rounded-3xl
                                        shadow-md
                                        break-words
                                        ${
                                            isMine
                                                ? `
                                                    bg-gradient-to-br
                                                    from-indigo-700
                                                    via-purple-700
                                                    to-violet-800
                                                    text-white
                                                    rounded-br-none
                                                  `
                                                : `
                                                    bg-white
                                                    text-gray-800
                                                    rounded-bl-none
                                                  `
                                        }
                                    `}
                                >

                                    <div className="text-sm">
                                        {msg.content}
                                    </div>

                                    <div
                                        className={`
                                            text-[10px]
                                            mt-2
                                            text-right
                                            ${
                                                isMine
                                                    ? "text-purple-100"
                                                    : "text-gray-500"
                                            }
                                        `}
                                    >
                                        {new Date(
                                            msg.created_at
                                        ).toLocaleTimeString(
                                            [],
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }
                                        )}
                                    </div>

                                </div>

                            </div>

                        );

                    })

                )}

                <div ref={messagesEndRef} />

            </div>

            {/* Input flottant */}
            <div
                className="
                    absolute
                    bottom-5
                    left-6
                    right-6
                    z-20
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-3
                        px-4
                        py-2
                        rounded-3xl
                        border
                        border-white/20
                        bg-black/30
                        backdrop-blur-xl
                        shadow-2xl
                    "
                >

                    <button
                        className="
                            text-white/70
                            hover:text-white
                            transition-colors
                        "
                    >
                        <Paperclip size={20} />
                    </button>

                    <input
                        type="text"
                        value={content}
                        onChange={(e) =>
                            setContent(
                                e.target.value
                            )
                        }
                        onKeyDown={(e) => {

                            if (
                                e.key === "Enter"
                            ) {
                                handleSend();
                            }

                        }}
                        placeholder="Write a message..."
                        className="
                            flex-1
                            bg-transparent
                            text-white
                            placeholder-white/60
                            outline-none
                        "
                    />

                    <button
                        onClick={handleSend}
                        disabled={!content.trim()}
                        className="
                            flex
                            items-center
                            justify-center
                            w-12
                            h-12
                            rounded-full
                            bg-gradient-to-br
                            from-violet-600
                            via-purple-600
                            to-indigo-600
                            hover:scale-105
                            transition-all
                            duration-200
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            shadow-lg
                            shadow-purple-500/40
                        "
                    >

                        <Send
                            size={18}
                            className="text-white"
                        />

                    </button>

                </div>

            </div>

        </div>
    );
}