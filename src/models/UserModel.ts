import mongoose, { Schema, Document } from "mongoose"

interface User extends Document {
    name: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date,
    isVerified: boolean,
    profilePic:string,
    gender:string
}

const UserSchema: Schema<User> = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, 'Please use a valid email address']
    }, password: {
        type: String,
        required: [true, "Password is required"]
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"]
    },
    forgotPasswordToken: {
        type: String,
        default:""
    },
    forgotPasswordTokenExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code expiry is required"]
    },
    profilePic:{
        type:String,
    },
    gender:{
        type:String,
        required:[true,"Please provide your gender"]
    }
})

const UserModel = (mongoose.models.User || mongoose.model('User', UserSchema))

export default UserModel