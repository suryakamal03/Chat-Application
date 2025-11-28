import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import "dotenv/config";
import cloudinary from "../lib/cloudinary.js"
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    if(newUser){
    const saved =  await newUser.save();
    generateToken(saved._id, res);

    console.log(`✓ New user signed up: ${saved.name} (${saved._id})`);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePic: newUser.profilePic
    });

  try {
  await sendWelcomeEmail(saved.name, saved.email, process.env.CLIENT_URL);
  console.log("Sending welcome email to:", email, "with link:", process.env.CLIENT_URL);

} catch (error) {
  console.error("Failed to send welcome email", error);
}

  }else{
    res.status(400).json({message:"Invalid user data"})
  }
  } catch (err) {
    console.error("Error in signup controller:", err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

export const login = async (req,res) => {
  const {email,password} = req.body;
  if(!email || !password){
    return res.status(400).json({message:"email and password are required"})
  }
  try{
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"Invalid Credentials"})
    }
    const ispassword = await bcrypt.compare(password,user.password)
    if(!ispassword){
      return res.status(400).json({message:"Invalid Credentials"})
    }
    generateToken(user._id,res)
    
    console.log(`✓ User logged in: ${user.name} (${user._id})`);
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic
    });
  }catch(err){
    console.error("Error in login controller",err);
    res.status(500).json({message:"server error"})
  }
}
export const logout = (req,res) => {
  const userName = req.user?.name || "Unknown user";
  console.log(`✓ User logged out: ${userName}`);
  res.cookie("jwt","",{MaxAge:0})
  res.status(200).json({message:"Logout successfully"})
}

export const updateProfile = async (req,res)=>{
  try{
  const {profilePic} = req.body;
  if(!profilePic) return res.status(400).json({message:"Profile pic is required"})
    const userId = req.user._id;
  const uploadResponse =await cloudinary.uploader.upload(profilePic);
  const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

  res.status(200).json(updatedUser);
}catch(err){
   console.log("error in updating profile",error);
   res.status(500).json({message:"Internal server error"})
}
}