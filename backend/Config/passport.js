import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../Models/User.js";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async(accessToken,refreshToken,profile,cb)=>{
    try {
        let email = profile.emails?.[0]?.value;
        let name = profile.displayName;
        let googleId = profile.id;
        let user = await User.findOne({$or: [{email},{googleId}]});
        if(!user){
            let user = await User.create({
                name,email,googleId,authProvider: 'google'
            })
        }else if(!user.googleId){
            user.googleId = googleId;
            await user.save();
        }
        return cb(null,user);
    } catch (error) {
        return cb(error,null)
    }
}))
