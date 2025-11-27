import React from 'react'
import { useChatStore } from "../store/useChatStore";

import ProfileHeader from '../components/ProfileHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatContainer from '../components/ChatContainer';
import ContactsList from '../components/ContactsList';
import PlaceHolder from '../components/PlaceHolder';
import ChatList from '../components/ChatList';
function ChatPage() {
    const {activeTab, setActiveTab, SelectedUser} = useChatStore();
  return (
     <div className="fixed inset-0 bg-[#0a0a0a] flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-[400px] bg-[#1a1a1a] border-r border-white/10 flex flex-col">
        {/* Header - now only inside the left sidebar */}
        <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <ProfileHeader/> 
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <ActiveTabSwitch />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "chats" ? <ChatList/> : <ContactsList/>}
        </div>
      </div>

      {/* Right Section - Empty State */}
      <div className="flex-1 bg-[#0f0f0f] flex items-center justify-center">
        {SelectedUser ? <ChatContainer/> :<PlaceHolder/>}
      </div>
    </div>

  )
}

export default ChatPage
