// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./src/routes/Routesauth.js";
import { ConnectDB } from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";

dotenv.config(); // load .env immediately

const app = express();
app.set("trust proxy", true); // helpful when behind a proxy

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000; // <-- use PORT (uppercase)

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

// Production: serve built frontend
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");
  console.log("NODE_ENV=production detected. Will serve frontend from:", distPath, "exists?", fs.existsSync(distPath));

  // serve static files
  app.use(express.static(distPath));

  // SPA fallback for all routes (must be last)
  app.get("/", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  console.log("NODE_ENV !== production. Backend will NOT serve frontend. Current NODE_ENV:", process.env.NODE_ENV);
}

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
  ConnectDB();
});
