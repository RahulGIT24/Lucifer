import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth'{
    interface User{
        _id?:string,
        isVerified?:boolean,
        name?:string,
        email?:string
    }
    interface Session{
        user:{
            _id?:string,
            isVerified?:boolean,
            name?:string,
            email?:string
        }& DefaultSession['user']
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string,
        isVerified?:boolean,
        name?:string,
        email?:string
    }
}