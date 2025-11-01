import express from "express"
import {signup} from '../controllers/authcontroller.js'
const Router = express.Router()

Router.post('/signup',signup)

Router.get('/login',(req,res)=>{
  res.send("login")
})
Router.get('/logout',(req,res)=>{
  res.send("logout")
})

export default Router