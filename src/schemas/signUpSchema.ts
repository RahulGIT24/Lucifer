import { z } from 'zod'

export const emailSchema = z.string().email({ message: "Invalid Email address" })
export const passwordSchema = z.string().min(8, { message: "Password's length should be more than 8 characters" })


export const signUpSchema = z.object({
    name: z.string().min(3, { message: "Invalid Name should be atleast 3 characters" }),
    email: emailSchema,
    password: passwordSchema,
    gender: z.enum(["male", "female", "other"], { message: "Invalid gender" }),
})