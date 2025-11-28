import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "https://chat-application-kx10.onrender.com";  
export const useAuthStore = create((set, get) => ({
  authUser:null,
  isCheckingAuth:true,
  isSigningup:false,
  isloggingIn:false,
  onlineUsers:[],
  socket:null,
  checkAuth: async () => {
    try{
      const res = await axiosInstance.get('/auth/check');
      set({authUser: res.data, isCheckingAuth:false});
      get().connectSocket();
    }catch(err){
      console.log("Error in checkAuth",err)
      set({authUser:null, isCheckingAuth:false })
    }finally{
      set({isCheckingAuth:false})
    }
  },
  signup: async (data)=>{
    set({isSigningup:true})
    try {
      const res = await axiosInstance.post('/auth/signup',data);
      set({authUser: res.data})
      toast.success("Account created Successful")

      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      set({isSigningup:false})
    }
  },
login: async (data)=>{
  try {
    const res = await axiosInstance.post('/auth/login',data);
    set({authUser: res.data})
    toast.success("Login Successful")

    get().connectSocket();
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong")
  }
},
logout: async()=>{
  try{
    await axiosInstance.post('/auth/logout');
    set({authUser:null})
    toast.success("Logout Successful")
    get().disconnectSocket();
  }catch(err){
    toast.error("Failed to logout")
    console.log(err)
  }
},
updateProfile: async(data)=>{
  try {
    const res = await axiosInstance.put('/auth/update-profile',data);
    set({authUser: res.data})
    toast.success("Profile Updated Successfully")
  } catch (error) {
    toast.error(error.response.data.message || "Something went wrong")
    console.log('error in updating',error)
  }
},
connectSocket: ()=>{
  const {authUser} = get();
  if(!authUser || get().socket?.connected) return;

  const socket = io(BASE_URL, {
    withCredentials: true,
  });

  socket.connect();
  set({socket});

  // Connection event handlers
  socket.on("connect", () => {
    console.log("✓ Socket connected successfully");
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message);
    toast.error("Failed to connect to chat server");
  });

  // Listen for online users
  socket.on("getOnlineUsers", (userIds) => {
    set({onlineUsers: userIds});
  });

},
disconnectSocket: ()=>{
  const socket = get().socket;
  if(socket?.connected){ 
    socket.disconnect();
    console.log("✓ Socket disconnected");
  }
  set({socket: null});
}
}))