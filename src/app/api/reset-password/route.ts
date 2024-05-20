import { connectToDB } from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import bcrypt from 'bcryptjs'

export async function POST(request:Request){
    await connectToDB();
    try {
        const {token,password} = await request.json();

        const findByToken = await UserModel.findOne({forgotPasswordToken:token});

        if(!findByToken){
            return Response.json({
                success:false,
                message:"Invalid Token"
            },{
                status:400
            })
        }

        const tokenExpiry = findByToken.forgotPasswordTokenExpiry > new Date();

        if(!tokenExpiry){
            findByToken.forgotPasswordTokenExpiry = undefined;
            findByToken.forgotPasswordToken = undefined;
            await findByToken.save();
            return Response.json({
                success:false,
                message:"Token Expired"
            },{
                status:400
            })
        }
        
        const hashedPassword = await bcrypt.hash(password,10);
        findByToken.password = hashedPassword;
        findByToken.forgotPasswordTokenExpiry = undefined;
        findByToken.forgotPasswordToken = undefined;
        await findByToken.save();

        return Response.json({
            succes:true,
            message:"Password Updated Successfully"
        },{
            status:200
        })

    } catch (error) {
        console.log(error)
        return Response.json({
            succes:false,
            message:"Error while resetting password"
        },{
            status:500
        })
    }
}