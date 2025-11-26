import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set,) => ({
  authUser:null,
  isCheckingAuth:true,
  isSigningup:false,
  isloggingIn:false,
  checkAuth: async () => {
    try{
      const res = await axiosInstance.get('/auth/check');
      set({authUser: res.data.user, isCheckingAuth:false});
    }catch(err){
      console.log("Error is suthcheck",err)
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
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong")
  }
},
logout: async(data)=>{
  try{
    await axiosInstance.post('/auth/logout');
    set({authUser:null})
    toast.success("Logout Successful")
  }catch(err){
    toast.error("Failed to logout")
    console.log(err)
  }
}
}))