import express from 'express';
const router = express.Router();
import passport from 'passport';
import { check, createAdmin, googleLoginCallBack, login, logout, register } from '../Controllers/authController.js';
import { isLoggedin } from '../Middlewares/isLoggedin.js';
import { isAdmin } from '../Middlewares/isAdmin.js';

router.get('/google',passport.authenticate('google',{scope: ["profile","email"]}))

router.get("/google/callback",passport.authenticate("google", { session: false, failureRedirect: process.env.FRONTEND_URL + "/auth/login" }),googleLoginCallBack);

router.post('/register',register)

router.get('/isLoggedin',isLoggedin,(req,res)=> {
    let user = req.user
    return res.status(200).json({...user,isLoggedin:true})
})

router.get('/isAdmin',isAdmin,(req,res)=> {
    return res.status(200).send(req.user)
})

router.post('/logout',logout);

router.post('/login',login);

router.post('/createAdmin',createAdmin);

router.post('/register/checkUser',check);
export default router