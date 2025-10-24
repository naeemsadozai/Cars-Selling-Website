import { sendMail } from "../Config/nodemailer.js";
import User from "../Models/User.js";
import { cookieOptions } from "../Utils/cookieOptions.js";
import { verifyPassword } from "../Utils/passwordVerifying.js";
import { token } from "../Utils/signToken.js";
import {hashedPass} from '../Utils/passwordHashing.js'

export const googleLoginCallBack = async (req, res) => {
  let newToken = token(req.user);
  res.cookie(process.env.COOKIE_NAME, newToken, cookieOptions);
  res.redirect(process.env.FRONTEND_URL + "/");
};

export const register = async (req, res) => {
  try {
    
    let { name, email, password } = req.body;
    if(!name || !email || !password){
      return res.status(400).json({message: "Please fill all fields"})
    }
    let user = await User.findOne({ email });
    if (user) {      
      return res
      .status(400)
      .json({ message: "User Already exists please Login" });
    }
    let hash = await hashedPass(password)
    user = await User.create({
      name,
      email,
      password: hash,
    });
    await user.save();      
    let newtoken = token(user);
    res.cookie(process.env.COOKIE_NAME,newtoken,cookieOptions)
    return res.status(201).json({ message: "User created Successfully" });
    
  } catch (error) {
    return res.status(500).json({message: "Internal Server Error Occured"});
  }
};

export const logout = async(req,res)=>{
    let cookie = req.cookies[process.env.COOKIE_NAME]
    if(!cookie){
        return res.status(400).json({message: "You are not logged in"})
    }
    res.clearCookie(process.env.COOKIE_NAME,{
      httpOnly: true,
      secure: true,
      sameSite: isProduction ? "None" : "Lax"
    });
    return res.status(200).json({message: "Logged out successfully"})
}

export const check = async (req,res)=>{
  let {email} = req.body;     
  try {
    let user = await User.findOne({email})
    if(user){      
      return res.status(200).json({message: "User Already Exists Please Login"})
    }
    let otp = Math.floor(100000 + Math.random() * 900000);
    await sendMail(email,otp)    
    return res.status(201).json({message: "Good to go",otp:otp});
  } catch (error) {
    return res.status(500).json({message: "Internal Server Error"})
  }
}

export const login = async (req,res)=>{
  try {
    let {email,password} = req.body;
  if(!email || !password){
    return res.status(403).json({message: "Enter All the Details"})
  }
  let user = await User.findOne({email})
  if(!user){
    return res.status(403).json({message: 'User Does not exists'})
  }
  let hashedPass = user.password;
  if(hashedPass){
    let verified = await verifyPassword(password,hashedPass);
    if(verified){
    let newtoken = token(user)
    res.cookie(process.env.COOKIE_NAME,newtoken,cookieOptions)
    return res.status(200).json({message: "you are logged in"})
  }else{
    return res.status(403).json({message: "Wrong Credentials"})
  }
  }else{
    res.status(403).json({message: "Wrong Credentials"})
  }
   
  } catch (error) {
    res.status(500).json({message: "Internal server Error"})
  }
  
  
}


export const createAdmin = async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(403).json({ message: "Admin already exists" });
    }

    const pas = await hashedPass('Naeem1234');
    const newAdmin = new User({
      name: "Naeem Aslam",
      email: "muhammadnaeem@gmail.com",
      password: pas,
      role: 'admin',
    });
    await newAdmin.save();
    return res.status(201).json({ message: "Admin Created Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};






