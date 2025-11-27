import React from "react";
import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <>
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
    </>
  );
}

export default ActiveTabSwitch;