import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="overflow-y-auto">
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                {chat.profilePic ? (
                  <img 
                    src={chat.profilePic} 
                    alt={chat.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-emerald-400 text-lg font-semibold">
                    {chat.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {onlineUsers.includes(chat._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium truncate">{chat.name}</h3>
              <p className="text-gray-400 text-sm truncate">{chat.email}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ChatsList;