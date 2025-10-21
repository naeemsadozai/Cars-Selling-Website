import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: /^[a-zA-Z0-9.%_-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
        type: String,
    },
    authProvider: {
        type: String,
        enum: ["google","local"],
        default: 'local'
    },
    googleId: {
        type: String,
    },
    role: {
        type: String,
        anum: ['user','admin'],
        default: 'user'
    }
})

const User = mongoose.model('user',userSchema);
export default User;