import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

import { ApiResponse } from "@/types/ApiResponse"
import VerificationEmail from "@/emails/VerificationEmail";
import ForgotPasswordEmail from "@/emails/ForgotPasswordEmail";

export async function sendVerificationEmail(email: string, name: string, type:string, verifyCode?: string, link?: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: type === 'VERIFY' ? 'Verfication Code for Gemini' : 'Password Recovery for Gemini',
            react: type === 'VERIFY' ? VerificationEmail({ otp: verifyCode || '', username: name }) : ForgotPasswordEmail({ username: name, link: link || '' })
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
