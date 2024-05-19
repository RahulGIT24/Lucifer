import mongoose, { Schema, Document } from "mongoose"

interface User extends Document {
    name: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    forgotPasswordCode: string,
    forgotPasswordCodeExpiry: Date,
    isVerified: boolean
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
    forgotPasswordCode: {
        type: String,
    },
    forgotPasswordCodeExpiry: {
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
})

const UserModel = (mongoose.models.User || mongoose.model('User', UserSchema))

export default UserModel