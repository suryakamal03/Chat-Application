import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js"
import User from "../models/User.js"
export const getAllcontacts = async(req, res) => {
  try {
    const loggedinUserId = req.user._id;
    const contacts = await User.find({_id:{$ne:loggedinUserId}}).select("-password");
    res.status(200).json(contacts);
  } catch (error) {
    console.log("error in getting the contacts",error);
    res.status(500).json({message:"Error in getting contacts"});
  }
}
export const getMessagesbyUserId = async(req, res) => {
  try {
    const myId = req.user._id;
    const {id:userToChatId} = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("error in getting messages", error);
    res.status(500).json({message:"Error in getting messages"});  
  }
}

export const sendMessage = async (req,res) =>{
  try {
    const {text,image} = req.body;
    const {id:receiverId} = req.params;
    const senderId = req.user._id;

    if(!text && !image){
      return res.status(400).json({message:"Message text or image is required"})
    }
    if(senderId.equals(receiverId)){
      return res.status(400).json({message:"Cannot send message to yourself"})
    }
    const receiverExists = await User.exists({_id:receiverId});
    if(!receiverExists){
      return res.status(404).json({message:"Receiver user not found"})
    }
    let imageUrl;
    if(image){
      //upload image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image:imageUrl,
    })
    await newMessage.save();
    //send response in real-time using socket.io
    res.status(201).json(newMessage);
  } catch (error) {
    
  }
}

export const getChatpartners = async(req,res) =>{
  try {
    const loggedinUserId = req.user._id;
    // find alll the messages where the logged in user is either sender or receiver
    const messages = await Message.find({
      $or:[
        {senderId:loggedinUserId},
        {receiverId:loggedinUserId}
      ]
    });
    const chatPartnerIds = [...new Set (messages.map(msg => msg.senderId.toString() === loggedinUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()))]
    const chatPartners = await User.find({_id: {$in:chatPartnerIds}}).select("-password");
    res.status(200).json(chatPartners)
  } catch (error) {
    console.log("error in fecting the chatpartner",error);
    res.status(500).json({error:"Internal server error"})
  }
}