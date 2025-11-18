import express from "express"
import {signup,login,logout} from '../controllers/authcontroller.js'
const Router = express.Router()

Router.post('/signup',signup)

Router.post('/login',login)

Router.post('/logout',logout)

export default Router