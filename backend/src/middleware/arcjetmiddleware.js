import aj from '../lib/arcjet.js'
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async(req,res,next) => {
  try {
    const decision = await aj.protect(req)
    if(decision.isDenied()){
        if(decision.reason.isRateLimit()){
          return res.status(429).json({message:"Rate limit exceeded.Please try again later."})
        }
        else if(decision.reason.isBot()){
        return res.status(403).json({message:"Bot access denied"})
        }else{
      return res.status(403).json({message:"Access denied byy security policy"})
    }
  }
  //check for spoofed bots (act as a human)
  if(decision.results.some(isSpoofedBot)){

  }
  next();
  } catch (error) {
    console.error("Protection  error ",error);
    next();
  }
}
