import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UserLoadingSkeleton from './UserLoadingSkeleton'
import NoChatsFound from './NoChatsFound';
const ChatList = () => {
  const {getMyChatPartners,chats,isUserLoading,setSelectedUser} = useChatStore();
  useEffect(()=>{
    getMyChatPartners();
  },[getMyChatPartners])
  if(isUserLoading) return <UserLoadingSkeleton/>
  if(chats.length === 0) return <NoChatsFound/>
  return (
    <div>
      {chats.map((chat)=>(
          <div key={chat._id}  className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5" onClick={()=> setSelectedUser(chat)}>
            <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/avatar.png"} alt={chat.name} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{chat.name}</h4>
          </div>
        </div>
      ))} 
    </div>
  )
}

export default ChatList
