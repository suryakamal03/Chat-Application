import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore';
import { XIcon } from 'lucide-react';
function ChatHeader() {
  const {SelectedUser,setSelectedUser} = useChatStore();
  useEffect(() => {
  const handleEsckey = (e) => {
    if (e.key === "Escape") {
      setSelectedUser(null);
    }
  };

  window.addEventListener("keydown", handleEsckey);

  return () => {
    window.removeEventListener("keydown", handleEsckey);
  };
}, [setSelectedUser]);

  return (
    <div className='flex justify-between items-center bg-[#1a1a1a] border-b border-white/10 px-6 py-4 w-full'>
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
            {SelectedUser.profilePic ? (
              <img 
                src={SelectedUser.profilePic} 
                alt={SelectedUser.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-emerald-400 text-lg font-semibold">
                {SelectedUser.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></span>
        </div>
        <div>
          <h2 className="text-white font-medium">{SelectedUser.name}</h2>
          <p className="text-gray-400 text-sm">Online</p>
        </div>
      </div>
      <button 
        onClick={() => setSelectedUser(null)}
        className="text-gray-400 hover:text-emerald-400 transition-colors"
      >
        <XIcon size={20} />
      </button>
    </div>
  )
}

export default ChatHeader
