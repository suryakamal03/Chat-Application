import express from "express"

const Router = express.Router()

Router.get('/signup',(req,res)=>{
  res.send("signup")
})

Router.get('/login',(req,res)=>{
  res.send("login")
})
Router.get('/logout',(req,res)=>{
  res.send("logout")
})

export default Router