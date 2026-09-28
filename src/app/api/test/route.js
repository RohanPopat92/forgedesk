import verifyAuth from "../../lib/auth"
import { NextResponse } from "next/server";
export async function GET(){
    try {


    const auth = await verifyAuth();

        if(!auth){
        return NextResponse.json(
            {message:"Unauthorized"},
            {status:401}
        )
    }

            return NextResponse.json([
        {   id:1,
            name:"Mechanical keyboard",
            price:2999
        },
        {   id:2,
            name:"Gaming mouse",
            price:1699
        },
        {   id:3,
            name:"USB-C Cable",
            price:159
        }                
    ])
    } catch (error) {
        console.log(error);
    }



    


}