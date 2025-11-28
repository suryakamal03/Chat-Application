import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import  authRouter  from "./routes/Routesauth.js";
import messageRouter from "./routes/Messageroute.js";
import {ConnectDB} from "./lib/db.js"
import cookieParser from "cookie-parser";
import {server, app} from "./lib/socket.js"
dotenv.config()
const PORT = process.env.Port || 5000
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials:true,
}))
app.use(express.json({ limit: "5mb" }))
app.use(cookieParser())
app.use('/api/auth',authRouter)
app.use('/api/messages',messageRouter)

server.listen(PORT,()=>{
  console.log(`server is running ${PORT}`);
  ConnectDB()
})