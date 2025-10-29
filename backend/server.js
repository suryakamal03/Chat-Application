import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import  authRouter  from "./routes/Routesauth.js";
const app = express();
dotenv.config()
const PORT = process.env.Port || 5000


app.use('/api/auth',authRouter)

app.listen(PORT,()=>{
  console.log(`server is running ${PORT}`);
})