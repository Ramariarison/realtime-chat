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
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-sm">{currentConversation.name}</div>
          <div className="flex items-center gap-1 text-xs text-green-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {currentConversation.isOnline ? "en ligne" : "hors ligne"}
          </div>
        </div>
      </div>

      <div 
        className="flex-1 flex flex-col overflow-y-auto bg-fixed"
        style={{
          backgroundImage: "url('/images/Pochita.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-3xl text-sm shadow-sm ${
                  msg.isSent
                    ? "bg-gradient-to-br from-indigo-700 via-purple-700 to-violet-800 text-white rounded-br-none"
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
        <div className="flex items-center rounded-r-full px-3 py-1.25 shadow-sm m-4 bg-black/20 backdrop-blur-sm">
          <input
            type="text"
            placeholder="Write a message here"
            className="flex-1 bg-transparent text-white placeholder-white/70 outline-none pr-10"
          />

          <div className="flex items-center gap-3">
            <button className="text-white/70 hover:text-white">
              <Paperclip size={20} />
            </button>

            <button 
              className="group flex items-center justify-center w-11 h-11 
                        bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 
                        hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500
                        active:scale-95 transition-all duration-200 
                        rounded-full shadow-lg shadow-purple-500/30
                        hover:shadow-xl hover:shadow-purple-500/40
                        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 
                        focus:ring-offset-zinc-950"
            >
              <Send 
                size={20} 
                className="text-white transition-transform group-active:rotate-45" 
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}