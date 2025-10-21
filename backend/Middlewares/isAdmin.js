import { decodeToken } from "../Utils/decodeToken.js";

export const isAdmin = async (req,res,next)=>{
    try {
        let newcookie = req.cookies[process.env.COOKIE_NAME];
        if(!newcookie){
            return res.status(403).json({message: "You are not authorized"})
        }
        let decoded = decodeToken(newcookie);
        if(decoded.role === 'admin'){
            next()
        }else{
            return res.status(403).json({message: "You are not authorized"})
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
    
}