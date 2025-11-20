import express from "express"
import {signup,login,logout,updateProfile} from '../controllers/authcontroller.js'
import { protectRoute } from '../middleware/authmiddleware.js';
import { arcjetProtection } from "../middleware/arcjetmiddleware.js";
const Router = express.Router()

Router.get('/test',protectRoute,(req,res)=>{
  res.status(200).json({message:"Tested the resigtered user "})
})

Router.post('/signup',arcjetProtection,signup)

Router.post('/login',arcjetProtection,login)

Router.post('/logout',arcjetProtection,logout)

Router.put('/update-profile',protectRoute,updateProfile)

Router.get("/check",protectRoute,(req,res)=> res.status(200).json(req.user))
export default Router