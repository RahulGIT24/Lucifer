import {z} from "zod"
import { emailSchema } from "./signUpSchema"

export const forgotPasswordSchema = z.object({
    email:emailSchema
})