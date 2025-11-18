import express from "express"
import {signup,login,logout,updateProfile} from '../controllers/authcontroller.js'
import { protectRoute } from '../middleware/authmiddleware.js';

const Router = express.Router()

Router.post('/signup',signup)

Router.post('/login',login)

Router.post('/logout',logout)

Router.put('/update-profile',protectRoute,updateProfile)

Router.get("/check",protectRoute,(req,res)=> res.status(200).json(req.user))
export default Router