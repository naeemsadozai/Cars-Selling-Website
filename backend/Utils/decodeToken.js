import jwt from 'jsonwebtoken';

export const decodeToken = (token)=>{    
    let user = jwt.verify(token,process.env.JWT_SECRET);
    return user;
}