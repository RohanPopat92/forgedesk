import db from "../../lib/db"
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(request){
    try {


    const {name,email,password} =await request.json();
        
    const [rows] = await db.execute(
        "SELECT email from users WHERE email=?",[email]
    )

    const [user] = rows;


    if(!user?.email){

        const hashPassword=await bcrypt.hash(password,10)
        const [result] = await db.execute(
            "INSERT INTO users(name,email,password_hash) VALUES(?,?,?)",[name,email,hashPassword]
        )

        if(result.affectedRows===1){

            return NextResponse.json(
                {
                    message:"User registered successfully",
                },
                {
                    status:201
                }
            )
        }

        else{
                return NextResponse.json(
    { message: "User could not be registered" },
    { status: 500 }
    );

        }

    }

    else{
            return NextResponse.json(
                {message:"User already exists"},
                {status:409}
            )
    }

    


    } catch (error) {
            return NextResponse.json(
                {message:"Some error"},
                {status:500}
            )
    
        console.log(error);
        
    }
}