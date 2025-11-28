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

// Allow both localhost and production URLs
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
   "https://chat-application-ten-zeta.vercel.app", 
  process.env.CLIENT_URL, // Your Vercel URL will be here
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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