import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, // 8 char, &$#@
        required: true
    }


})

export const User = mongoose.model("User", userSchema);