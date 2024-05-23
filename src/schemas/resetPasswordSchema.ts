import {z} from "zod"
import { passwordSchema } from "./signUpSchema"

export const resetPasswordSchema = z.object({
    password:passwordSchema,
    password1:passwordSchema
})