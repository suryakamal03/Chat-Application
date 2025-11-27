import React from 'react'
import { LogOutIcon, MoreVertical } from 'lucide-react'
import { useState,useRef } from 'react'
import {useAuthStore} from '../store/useAuthStore'
import { useChatStore } from "../store/useChatStore";
function ProfileHeader() {
    const {SelectedUser,isSoundEnabled,toggleSound} = useChatStore()
    const {logout,authUser,updateProfile} = useAuthStore()
    const [activeTab, setActiveTab] = useState('chats');
    const [selectedImg, setSelectedImg] = useState(null);

    const fileInputRef = useRef(null);
    const   handleImageUpload = (e) =>{
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
    }
  return (
    <div>
  <div className="flex items-center gap-3">

    {/* Avatar */}
    <div className="avatar online cursor-pointer" onClick={() => fileInputRef.current.click()}>
      <div className="w-12 rounded-full">
        <img 
          src={selectedImg || authUser?.profilePic || '/DefaultAvatar.avif'} 
          alt="Profile" 
        />
      </div>
    </div>

    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      onChange={handleImageUpload}
      className="hidden"
    />

    {/* Info */}
    <div>
      <h2 className="text-white md:w-[180px] truncate">{authUser.name}</h2>
      <p className="text-gray-400">Online</p>
    </div>

    <div className='text-slate-400 hover:text-slate-200 transition-colors' onClick={logout}>
      <LogOutIcon size={20}/>
    </div>
  </div>
</div>

  )
}

export default ProfileHeader
