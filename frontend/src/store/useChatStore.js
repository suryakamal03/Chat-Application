import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { getAllcontacts } from '../../../backend/controllers/messagecontroller';

export const useChatStore = create((set,get)=>({
  allcontacts:[],
  chats:[],
  messages:[],
  activeTab:null,
  isUserLoading:false,
  ismessagesLoading:false,
  issoundEnabled: localStorage.getItem('soundEnabled') === 'true',
  toggleSound:()=>{
    localStorage.setItem('isSoundEnabled', !get().issoundEnabled);
    set({issoundEnabled: !get().issoundEnabled})
  },
  setActiveTab:(tab)=>set({activeTab:tab}),
  setSelectedUser:(SelectedUser) => set({SelectedUser}),


  getAllcontacts: async()=>{
    set({isUserLoading:true})
    try {
      const res = await axiosInstance.get('/messages/contacts')
      set({allcontacts:res.data})
    } catch (error) {
      toast.error(error.response.data.message)
      console.log("Error fetching contacts",error)
    }finally{
      set({isUserLoading:false})
    }
  },

  getMyChatPartners: async()=>{
    set({isUserLoading:true})
    try {
      const res = await axiosInstance.get('/messages/chats')
      set({allcontacts:res.data})
    } catch (error) {
      toast.error(error.response.data.message)
      console.log("Error fetching contacts",error)
    }finally{
      set({isUserLoading:false})
    }
  }
  
}))