import { connectToDB } from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";


export async function POST(request: Request) {
    await connectToDB();

    try {
        const { id, code } = await request.json();
        const user = await UserModel.findById(id)

        if (!user) {
            return Response.json({
                success: false,
                message: "User not exist"
            }, {
                status: 404
            })
        }

        const isCodeValid = user.verifyCode === code;

        if (!isCodeValid) {
            return Response.json({
                success: false,
                message: "Invalid Code"
            }, {
                status: 401
            })
        }

        const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (!isCodeExpired) {
            return Response.json({
                success: false,
                message: "Code expired"
            }, {
                status: 401
            })
        }

        user.isVerified = true;
        await user.save();

        return Response.json({
            success: true,
            message: "User verified"
        },
            { status: 200 }
        )

    } catch (error) {
        return Response.json({
            success: false,
            message: "Can't verify Code"
        }, {
            status: 500
        })
    }
}