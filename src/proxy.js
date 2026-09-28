
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
// import db from "./app/lib/db"
export default async function proxy(request){
    try {

        const refreshToken = request.cookies.get("refreshToken")?.value;

        const path = request.nextUrl.pathname;

        const authPage = path==="/login" || path==="/register"
        if(refreshToken && authPage){
            return NextResponse.redirect(new URL("/",request.url))
        }

        if(refreshToken && !authPage){
            return NextResponse.next();
        }

        if(!refreshToken){
            return NextResponse.redirect(new URL("/login",request.url))
        }

        else{
            return NextResponse.redirect(new URL("/login",request.url))
        }
            
    } 
    
    
    
    catch (error) {
                    return NextResponse.redirect(new URL("/login",request.url))         
    }




}


export const config = {
    matcher: [
        "/((?!login|register|api|_next/static|_next/image|favicon.ico).*)"
    ]
};

// export const config = {
//     matcher: ["/dashboard/:path*"]
// };