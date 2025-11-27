import React, { useEffect,useRef } from 'react'
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from '../store/useAuthStore';
import ChatHeader from './ChatHeader';
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder';
import MessageInput from './MessageInput';  
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton';
const ChatContainer = () => {
  const {SelectedUser,getMessagesWithUser,messages,isMessagesLoading} = useChatStore();
  const {authUser} = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(()=>{
    getMessagesWithUser(SelectedUser._id);
  }, [SelectedUser,getMessagesWithUser])

  useEffect(()=>{
    if(messagesEndRef.current){
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="flex flex-col h-full w-full">
      <ChatHeader/>
      <div className='flex-1 px-6 overflow-y-auto py-8 bg-[#0f0f0f]'>
        {isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages.length > 0 ? (
          <div className='max-w-auto mx-auto space-y-6'>
            {messages.map(msg => (
              <div key={msg._id} className={`chat ${msg.senderId === authUser._id ? 'chat-end': 'chat-start'}`}>
                <div className={`chat-bubble relative ${msg.senderId === authUser._id ? "bg-emerald-500 text-white" : "bg-gray-700 text-gray-200"}`}>
                  {msg.image && (
                    <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                  )}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                       hour: "2-digit",
                       minute: "2-digit",
                        hour12: true, 
                    })}

                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}/>
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={SelectedUser.name} />
        )}
      </div>
      <MessageInput/>
    </div>
  )
}

export default ChatContainer
