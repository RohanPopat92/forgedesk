import { NextResponse } from "next/server";
import db from "../../lib/db"
import jwt from "jsonwebtoken"
import verifyAuth from "../../lib/auth";
import {randomUUID} from "crypto"

export async function POST(request){
    try {
        const verify = await verifyAuth();

        if(!verify){
            return NextResponse.json(
                {message:"No accessToken"},
                {status:401}
            )
        }


        const {b_name,b_type} = await request.json();
        console.log(b_name,b_type);
        const accessToken = request.cookies.get("accessToken")?.value;
        const payload = jwt.verify(accessToken,process.env.JWT_SECRET);
        const {userId} = payload;
        const b_id = randomUUID();

        const [rows] = await db.execute(
            "select business_name from business where business_name=?",[b_name]
        )

        const [business] = rows;
        console.log(business);
        if(!business){
                const [result] = await db.execute(
                "INSERT INTO business(user_id,business_name,business_type,business_id) VALUES(?,?,?,?)",[userId,b_name,b_type,b_id]
            )

            if(result.affectedRows===1){

                return NextResponse.json(
                    {message:"successfully business registered"},
                    {status:201}
                )
            }

            else{
                return NextResponse.json(
                    {message:"successfully business registered"},
                    {status:500}
                )
            }
        }

        else{
            return NextResponse.json(
                {message:"issue"},
                {status:401}
            )
        }

        
    } catch (error) {
        console.log(error);
                    return NextResponse.json(
                {message:"server issue"},
                {status:500}
            )
    }
}