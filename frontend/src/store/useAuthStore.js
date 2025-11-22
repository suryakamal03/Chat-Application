import {create} from 'zustand';

export const useAuthStore = create((set,get) => ({
  authUser:  {name:"Surya",_id:123,age:19},
  isloggedIn:false,
  login: () =>{
    console.log("we logged in ")
    set({isloggedIn:true})
  }
}))