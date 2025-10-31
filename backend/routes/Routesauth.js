import express from "express"
import {Signup} from '../controllers/authcontroller.js'
const Router = express.Router()

Router.get('/signup',Signup)

Router.get('/login',(req,res)=>{
  res.send("login")
})
Router.get('/logout',(req,res)=>{
  res.send("logout")
})

export default Router