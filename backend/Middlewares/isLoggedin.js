import { decodeToken } from "../Utils/decodeToken.js"

export const isLoggedin = async (req,res,next)=>{
    let cookie = process.env.COOKIE_NAME;
    console.log(cookie);
    let token = req.cookies[cookie];
    if(!token){
        console.log("NO TOKKEN");
        return res.status(200).json({message: "Not logged in",isLoggedin:false})
    }
    let user = decodeToken(token)
    console.log(user);
    req.user = {...user}
    next()

}
