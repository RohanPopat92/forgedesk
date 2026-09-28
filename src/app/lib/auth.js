import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function verifyAuth(){

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
        console.log(accessToken);

    if(!accessToken) {
        console.log("no accessToken");
        return null
    };

    try {
        
        const decoded = jwt.verify(accessToken,process.env.JWT_SECRET);

        return decoded;
    } catch (error) {
        return null;
    }
}