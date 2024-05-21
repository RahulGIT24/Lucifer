import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from "bcryptjs"
import { connectToDB } from '@/lib/dbConnect'
import UserModel from '@/models/UserModel'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                await connectToDB();
                try {
                    const user = await UserModel.findOne({ email: credentials.email });
                    if (!user) {
                        throw new Error("No user found")
                    }
                    if(!user.isVerfied){
                        throw new Error("You are not verified, You can't login in")
                    }
                    const isPasswordCompare = await bcrypt.compare(credentials.password,user.password);

                    if(!isPasswordCompare){
                        throw new Error("Invalid Credentials");
                    }

                    return user
                } catch (e: any) {
                    throw new Error(e);
                }
            },
        })
    ],
    callbacks:{  
        async jwt({token,user}){
            token._id = user._id?.toString(),
            token.isVerified = user.isVerified,
            token.name = user.name,
            token.email = user.email
            return token;
        },
        async session({session,token}){
            session.user._id = token._id?.toString(),
            session.user.isVerified = token.isVerified,
            session.user.name = token.name,
            session.user.email = token.email
            return session;
        }
    },
    pages: {
        signIn:'/sign-in'
    },
    session: {
        strategy:"jwt"
    },
    secret: process.env.NEXT_AUTH_SECRET
}