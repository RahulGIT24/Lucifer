import {z} from 'zod'
import { emailSchema, passwordSchema } from './signUpSchema'

export const signInSchema = z.object({
    email:emailSchema,
    password:passwordSchema
})