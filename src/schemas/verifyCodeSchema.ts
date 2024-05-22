import {z} from 'zod'

export const verifyCodeSchema = z.object({
    code:z.string().length(6,{message:"Code Should be of 6 Characters"})
})