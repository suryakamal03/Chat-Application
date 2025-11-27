import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-6">
        <MessageCircleIcon className="w-10 h-10 text-emerald-400" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-medium text-white mb-3">
        Start your conversation with {name}
      </h3>
      <div className="flex flex-col space-y-3 max-w-md mb-6">
        <p className="text-gray-400 text-sm">
          This is the beginning of your conversation. Send a message to start chatting!
        </p>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mx-auto"></div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button className="px-4 py-2 text-sm font-medium text-emerald-400 bg-emerald-500/10 rounded-full hover:bg-emerald-500/20 transition-colors">
          👋 Say Hello
        </button>
        <button className="px-4 py-2 text-sm font-medium text-emerald-400 bg-emerald-500/10 rounded-full hover:bg-emerald-500/20 transition-colors">
          🤝 How are you?
        </button>
        <button className="px-4 py-2 text-sm font-medium text-emerald-400 bg-emerald-500/10 rounded-full hover:bg-emerald-500/20 transition-colors">
          📅 Meet up soon?
        </button>
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;