import db from "../../lib/db"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request){
    try {
        
        const refreshToken = await request.cookies.get("refreshToken")?.value;
        const cookie = await cookies();
        if(!refreshToken){
            return NextResponse.json(
                {message:"No refresh token"},
                {status:401}
            )
        }

        const verify = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
        if(!verify){
            return NextResponse.json(
                {message:"Hacker or somethign"},
                {status:401}
            )
        }

        const [rows]= await db.execute(
            "select user_id,refresh_token from sessions where user_id=? AND refresh_token=? AND expires_at > NOW()",[verify.userId,refreshToken]
        )

        const [client] = rows;

        if(!client){
            cookie.delete('refreshToken');
            const [rows] = await db.execute(
                "delete from sessions where id =?"[client.user_id]
            )
            return NextResponse.json(
                {message:"Hacker or something"},
                {status:401}
            )            
        }

            const accessToken = jwt.sign(
                {userId:client.user_id},
                process.env.JWT_SECRET,
                {expiresIn:60*1}
            )

            const response =NextResponse.json(
                {message:"Access token is okay"},
                {status:200}
            )

            response.cookies.set("accessToken",accessToken,{
                httpOnly:true,
                secure:process.env.NODE_ENV==="production",
                sameSite:"lax",
                maxAge:60*1,
                path:"/"
            })

            return response;



    } catch (error) {
        console.log(error)
    }
}