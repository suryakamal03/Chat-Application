import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore';

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
  },

  getMessagesWithUser: async(userId)=>{
    set({isMessagesLoading:true})
    try{
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({messages: res.data});
    }catch(err){
      toast.error("Error fetching messages")
      console.log("Error fetching messages",err)
    }finally{
      set({isMessagesLoading:false})
    }
  },
  sendMessage: async(messageData)=>{
    const {SelectedUser, messages} = get();
    try {
       const res = await axiosInstance.post(`/messages/send/${SelectedUser._id}`, messageData)
       set({messages: [...messages, res.data]})
       // Refresh chat list to show the new conversation
       get().getMyChatPartners();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending message")
      console.log("Error sending message", error) 
    }
  },
  subscribeToMessages: ()=>{
    const {SelectedUser} = get();
    if(!SelectedUser) return;
    const socket = useAuthStore.getState().socket;
    if(!socket) return;

    socket.on("newMessage", (newMessage)=>{
    
      const isMessageFromSelectedUser = newMessage.senderId === SelectedUser._id;
      if(!isMessageFromSelectedUser) return;
      
      set({messages: [...get().messages, newMessage]});
    });
  },
  unsubscribeFromMessages: ()=>{
    const socket = useAuthStore.getState().socket;
    if(socket) {
      socket.off("newMessage");
    }
  }
}))