import jwt from 'jsonwebtoken';

export const token = (user)=>{    
    let token = jwt.sign({id: user._id,name:user.name,role:user.role},process.env.JWT_SECRET);
    return token;
}