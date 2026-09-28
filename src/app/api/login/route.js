import db from "../../lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(request){
    try {
        
        const {email,password}  = await request.json();

        const [rows] = await db.execute(
            "select email from users where email=?",[email]
        )

        const [user] =rows;

        


        if(user?.email){

            const [rows] = await db.execute(
                "select password_hash from users where email=?",[email]
            )

            const [info] = rows;

            
            const passCorrect=await bcrypt.compare(password,info.password_hash);

            if(passCorrect){
                const [rows] = await db.execute(
                    "select id from users where email=?",[email]
                )

                const [user]= rows;
                
                const sessions=await token(user.id);


                
                if(!sessions){
                    return  NextResponse.json(
                    {message:"Could not create a session"},
                    {status:500}
                );
                }
                else{
                    const response = NextResponse.json({message:"Login successful"},
                        {status:200})

                    response.cookies.set("accessToken",sessions.accessToken,{
                        httpOnly:true,
                        secure:process.env.NODE_ENV==="production",
                        sameSite:"lax",
                        maxAge:60*1,
                        path:"/"
                    })

                    response.cookies.set("refreshToken",sessions.refreshToken,{
                        httpOnly:true,
                        secure:process.env.NODE_ENV==="production",
                        sameSite:"lax",
                        maxAge:7*24*60*60,
                        path:"/"
                    })

                    return response;
                }

            }

            else{
                return NextResponse.json(
                    {message:"Email or password is incorrect"},
                    {status:401}
                )
            }
        }

        else{
            return NextResponse.json(
                {message:"User doesn't exists"},
                {status:409}
            )
        }
            

    } 
    
    catch (error) {
        console.log(error);
    }
}

async function token(info){
    try {
    const accessToken = jwt.sign(
        {userId:info},
        process.env.JWT_SECRET,
        {expiresIn:60*1}
    )

    const refreshToken = jwt.sign(
        {userId:info},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:"7d"}
    )        

        const expiresAt = new Date(Date.now() + 7*24*60*60*1000);
        const [result] = await db.execute(
        "insert into sessions(user_id,refresh_token,expires_at) VALUES(?,?,?)",[info,refreshToken,expiresAt]
    )

    if(result.affectedRows===1){
            return {accessToken,refreshToken};
    }
    else{
        return null;
    }

    } catch (error) {
        console.log("Session creation failed",error);
        return null;
    }


}