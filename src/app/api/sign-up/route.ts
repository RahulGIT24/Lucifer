import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import UserModel from "@/models/UserModel";
import bcrypt from "bcryptjs"
import { connectToDB } from "@/lib/dbConnect"

export async function POST(request: Request) {
    await connectToDB();

    try {
        const { name, email, password,gender } = await request.json();

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
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 360000)
                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            let pic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            if(gender==='female'){
                pic = "https://cdn2.iconfinder.com/data/icons/business-and-finance-related-hand-gestures/256/face_female_blank_user_avatar_mannequin-512.png"
            }else if(gender=='male'){
                pic = "https://w7.pngwing.com/pngs/910/606/png-transparent-head-the-dummy-avatar-man-tie-jacket-user.png"
            }

            const user = new UserModel({
                name,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                gender,
                profilePic:pic
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