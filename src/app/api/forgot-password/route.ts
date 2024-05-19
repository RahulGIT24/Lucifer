import { connectToDB } from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import UserModel from "@/models/UserModel";
import bcrypt from 'bcryptjs'

export async function POST(request:Request){
    await connectToDB();

    try {
        const {email} = await request.json();

        const isExistingUser = await UserModel.findOne({email});

        if(!isExistingUser){
            return Response.json({
                success:false,
                message:"User not exist"
            },{status:404})
        }

        if(!isExistingUser.isVerified){
            return Response.json({
                success:false,
                message:"Your account is not verified"
            },{status:400})
        }

        const forgotPasswordToken = await bcrypt.hash(isExistingUser._id.toString(),10);
        const link = `${process.env.DOMAIN}/forgotpassword/${forgotPasswordToken}`;
        isExistingUser.forgotPasswordToken = forgotPasswordToken;
        const expireToken = new Date();
        expireToken.setHours(expireToken.getHours() + 1);
        isExistingUser.forgotPasswordTokenExpiry = expireToken;
        await isExistingUser.save();

        const sendEmail = await sendVerificationEmail(email,isExistingUser.name.split(" ")[0],'FORGOTPASSWORD','',link)

        if(!sendEmail.success){
            return Response.json({
                succes:false,
                message:sendEmail.message
            },{
                status:400
            })
        }

        return Response.json({
            succes:true,
            message:"Password Recovery Link Send"
        },{
            status:200
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            succes:false,
            message:"Internal Server Error"
        },{
            status:500
        })
    }
}