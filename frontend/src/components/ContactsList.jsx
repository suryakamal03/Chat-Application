import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UserLoadingSkeleton />;

  return (
    <div className="overflow-y-auto">
      {allContacts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">No contacts available</p>
        </div>
      ) : (
        allContacts.map((contact) => (
          <div
            key={contact._id}
            className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5"
            onClick={() => setSelectedUser(contact)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                  {contact.profilePic ? (
                    <img 
                      src={contact.profilePic} 
                      alt={contact.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-emerald-400 text-lg font-semibold">
                      {contact.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                {onlineUsers.includes(contact._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{contact.name}</h3>
                <p className="text-gray-400 text-sm truncate">{contact.email}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default ContactList;