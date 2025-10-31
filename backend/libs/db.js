import mongoose from "mongoose";

export const ConnectDB = async ()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log("MONGODB CONNECTED",conn.connection.host);
  } catch (err) {
    console.error("connnection errror in mongodb",err);
    process.exit(1)// 1 means fail 0 means success
  }
}