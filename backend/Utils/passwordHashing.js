import bcrypt, { hash } from 'bcrypt';

export const hashedPass = async (pass)=>{
    const salt = await  bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pass,salt)
    return hash
}