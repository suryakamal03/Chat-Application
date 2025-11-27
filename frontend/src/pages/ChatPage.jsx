import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useState } from 'react';
import { Search, MoreVertical, MessageSquare } from 'lucide-react';


function ChatPage() {
    const {logout,SelectedUser} = useAuthStore()
    const [activeTab, setActiveTab] = useState('chats');

  // Sample data for chats
  const chats = [];

  // Sample data for contacts
  const contacts = [];      
  return (
     <div className="fixed inset-0 bg-[#0a0a0a] flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-[400px] bg-[#1a1a1a] border-r border-white/10 flex flex-col">
        {/* Header - now only inside the left sidebar */}
        <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <span className="text-black">ME</span>
            </div>
            <div>
              <h2 className="text-white">My Account</h2>
              <p className="text-gray-400">Online</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-emerald-400 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab("chats")}
            className={`flex-1 py-4 transition-all ${
              activeTab === "chats"
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Chats
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex-1 py-4 transition-all ${
              activeTab === "contacts"
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Contacts
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "chats" && (
            <div>
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-400">{chat.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white">{chat.name}</h3>
                        <span className="text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-gray-400 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "contacts" && (
            <div>
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-400">
                        {contact.avatar}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white mb-1">{contact.name}</h3>
                      <p className="text-gray-400">{contact.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Empty State */}
      <div className="flex-1 bg-[#0f0f0f] flex items-center justify-center">
        {SelectedUser ? (
          <div>
            
          </div>
        ):(
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
              <MessageSquare
                className="w-10 h-10 text-emerald-400"
                strokeWidth={1.5}
              />
            </div>
          </div>
          <h2 className="text-white mb-2">Select a chat to start messaging</h2>
          <p className="text-gray-400">
            Choose a conversation from the sidebar to begin
          </p>
        </div>
        )}
      </div>
    </div>

  )
}

export default ChatPage
