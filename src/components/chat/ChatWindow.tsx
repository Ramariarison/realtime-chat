import { Paperclip, Send } from "lucide-react";

interface ChatWindowProps {
  conversationId: number;
}

export default function ChatWindow({ conversationId }: ChatWindowProps) {

  // Simulation des données de la conversation (à remplacer plus tard par une vraie requête API)
  // On utilise conversationId pour simuler le chargement de la bonne conversation
  const currentConversation = {
    id: conversationId,
    name: conversationId === 1 ? "Nomena Fitiavana" : 
          conversationId === 2 ? "Alice Marielle" :
          conversationId === 3 ? "John Rakoto" : "Sophie Razafy",
    avatar: `https://i.pravatar.cc/48?u=${conversationId}`,
    isOnline: conversationId === 1 || conversationId === 3,
  };

  const messages = [
    { id: 1, text: "Salut Comment vas-tu ?", isSent: false, time: "14:25" },
    { id: 2, text: "Très bien et toi ?", isSent: true, time: "14:26" },
    { id: 3, text: "Ça avance sur le projet ?", isSent: false, time: "14:28" },
    { id: 4, text: "Oui, je suis dessus en ce moment", isSent: true, time: "14:29" },
  ];

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header du chat window */}
      <div className="p-4 bg-white flex items-center gap-3">
        <img
          src={currentConversation.avatar}
          alt={currentConversation.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-sm">{currentConversation.name}</div>
          <div className="flex items-center gap-1 text-xs text-green-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {currentConversation.isOnline ? "en ligne" : "hors ligne"}
          </div>
        </div>
      </div>

      {/* Zone pour les messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-200">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-3xl text-sm shadow-sm ${
                msg.isSent
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
              <div
                className={`text-[10px] mt-1 opacity-70 ${
                  msg.isSent ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Zone de saisie */}
      <div className="p-4 bg-gray-200">
        <div className="flex items-center bg-white rounded-md px-3 py-2 shadow-md">

          {/* Input */}
          <input
            type="text"
            placeholder="Write a message..."
            className="flex-1 bg-transparent text-gray-800 outline-none pr-10"
          />

          {/* Icons container */}
          <div className="flex items-center gap-3">

            {/* Attach */}
            <button className="text-gray-400 hover:text-gray-800 ">
              <Paperclip size={20} />
            </button>

            {/* Send */}
            <button className="bg-gradient-to-br from-indigo-700 via-purple-700 to-violet-800 hover:bg-blue-600 px-3 py-2 rounded-md flex items-center gap-2">
              <span className="text-white font-semibold">Send</span>
              <Send size={18} className="text-white" />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}