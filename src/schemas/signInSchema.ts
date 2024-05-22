import {z} from 'zod'

export const signInSchema = z.object({
    email:z.string().email({message:"Invalid Email address"}),
    password:z.string().min(8,{message:"Password's length should be more than 8 characters"}),
})