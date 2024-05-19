import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

import { ApiResponse } from "@/types/ApiResponse"
import VerificationEmail from "@/emails/VerificationEmail";

export async function sendVerificationEmail(email: string, name: string, verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verfication Code for Gemini',
            react: VerificationEmail({ otp: verifyCode, username: name })
        });
        return {
            success: true,
            message: "Code sent successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "Error while sending email"
        }
    }
}
