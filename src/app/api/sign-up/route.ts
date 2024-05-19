import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import UserModel from "@/models/UserModel";
import bcrypt from "bcryptjs"
import { connectToDB } from "@/lib/dbConnect"

export async function POST(request: Request) {
    await connectToDB();

    try {
        const { name, email, password } = await request.json();

        const existingUserByEmail = await UserModel.findOne({ email: email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User with this email already exists"
                }, {
                    status: 400
                })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCode = new Date(Date.now() + 360000)
                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const user = new UserModel({
                name,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate
            })

            await user.save()
        }

        const emailResponse = await sendVerificationEmail(email, name.split(" ")[0], verifyCode);

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 })
        }

        return Response.json({
            success: true,
            message: "User registered, Please verify your email"
        }, { status: 201 })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error ocuured while signing up"
        }, {
            status: 500
        })
    }
}