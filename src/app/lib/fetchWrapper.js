
import { useRouter } from "next/navigation";


export default async function fetchWrapper(url,options={}){

    try {
        const fetchConfig = {
            credentials:"include",
            ...options
        }

        let response = await fetch(url,fetchConfig);


        if(response.status==401){
        const refresh = await fetch("http://localhost:3000/api/refresh",{
                method:"POST"
            })

            if(refresh.ok){
                response = await fetch(url,fetchConfig);
        }
        else{
            console.log(refresh.status);
            console.log("refresh invalid");
            return refresh;
        }
    }


        return response;
}
        

    
    
    
    catch (error) {
        console.error("Network / Critical Failure in fetchWrapper:", error);
    

         throw error; 
    }



    
}