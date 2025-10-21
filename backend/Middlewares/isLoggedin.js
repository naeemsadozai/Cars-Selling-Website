import { decodeToken } from "../Utils/decodeToken.js"

export const isLoggedin = async (req,res,next)=>{
    let cookie = process.env.COOKIE_NAME;
    let token = req.cookies[cookie];
    if(!token){
        return res.status(200).json({message: "Not logged in",isLoggedin:false})
    }
    let user = decodeToken(token)
    req.user = {...user}
    next()
}