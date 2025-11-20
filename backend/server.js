import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import  authRouter  from "./src/routes/Routesauth.js";
import {ConnectDB} from "./src/lib/db.js"
import cookieParser from "cookie-parser";
import path from "path";

const __dirname = path.resolve();
const app = express();
dotenv.config()
const PORT = process.env.Port || 5000

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT,()=>{
  console.log(`server is running ${PORT}`);
  ConnectDB()
})