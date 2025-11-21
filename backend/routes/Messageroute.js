import express from "express"
import {getAllcontacts,getMessagesbyUserId,sendMessage,getChatpartners} from "../controllers/messagecontroller.js"
import { protectRoute } from "../middleware/authmiddleware.js";
import { arcjetProtection } from "../middleware/arcjetmiddleware.js";
const router = express.Router();

router.use(arcjetProtection,protectRoute);

router.get("/contacts",getAllcontacts);
router.get("/chats",getChatpartners);
router.get("/:id", getMessagesbyUserId);
router.post("/send/:id",sendMessage);
export default router;