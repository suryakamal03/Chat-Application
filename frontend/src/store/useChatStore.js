import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
export const useChatStore = create((set,get)=>({
  allContacts:[],
  chats:[],
  messages:[],
  activeTab:'chats',
  isUsersLoading:false,
  SelectedUser: null,
  isMessagesLoading:false,
  isSoundEnabled: localStorage.getItem('soundEnabled') === 'true',
  toggleSound:()=>{
    localStorage.setItem('isSoundEnabled', !get().isSoundEnabled);
    set({isSoundEnabled: !get().isSoundEnabled})
  },
  setActiveTab:(tab)=>set({activeTab:tab}),
  setSelectedUser:(SelectedUser) => set({SelectedUser}),


  getAllContacts: async()=>{
    set({isUsersLoading:true})
    try {
      const res = await axiosInstance.get('/messages/contacts')
      set({allContacts:res.data})
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching contacts")
      console.log("Error fetching contacts",error)
    }finally{
      set({isUsersLoading:false})
    }
  },

  getMyChatPartners: async()=>{
    set({isUsersLoading:true})
    try {
      const res = await axiosInstance.get('/messages/chats')
      set({chats:res.data})
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching chats")
      console.log("Error fetching chats",error)
    }finally{
      set({isUsersLoading:false})
    }
  }
  
}))