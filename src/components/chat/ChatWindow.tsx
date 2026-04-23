import { useState } from "react";

interface ChatWindowProps {
  conversationId: number;
}

export default function ChatWindow({ conversationId }: ChatWindowProps) {
  const [message, setMessage] = useState("");

  // Simulation des données de la conversation (à remplacer plus tard par une vraie requête API)
  // On utilise conversationId pour simuler le chargement de la bonne conversation
  const currentConversation = {
    id: conversationId,
    name: conversationId === 1 ? "Alice Dupont" : 
          conversationId === 2 ? "Bob Martin" :
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

  const handleSend = () => {
    if (!message.trim()) return;
    
    console.log(`Message envoyé dans la conversation ${conversationId} :`, message);
    // TODO: Plus tard → envoyer le message via API avec conversationId
    
    setMessage("");
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header du chat window */}
      <div className="p-4 bg-gradient-to-br from-indigo-700 via-purple-700 to-violet-800 flex items-center gap-3">
        <img
          src={currentConversation.avatar}
          alt={currentConversation.name}
          className="w-10 h-10 rounded-2xl object-cover"
        />
        <div>
          <div className="font-semibold text-white">{currentConversation.name}</div>
          <div className="flex items-center gap-1 text-xs text-green-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {currentConversation.isOnline ? "en ligne" : "hors ligne"}
          </div>
        </div>
      </div>

      {/* Zone pour les messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-200">
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
      <div className="p-4 bg-gradient-to-br from-indigo-700 via-purple-700 to-violet-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Écrire un message..."
            className="flex-1 px-5 py-3 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-full font-medium transition-all active:scale-95"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}