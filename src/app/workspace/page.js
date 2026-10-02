"use client"

import styles from "./page.module.css"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import fetchWrapper from "../lib/fetchWrapper";


export default function WorkSpace(){
    const route = useRouter();

    const [b_name, setbName]= useState("");
    const [bNameErr,setbNameErr] = useState("");
    const [b_type,setbType] = useState("");
    const [option,setOption] = useState(false);
    const [error,setError] = useState("");

    function validateBName(e){
    if(e===""){
        return "Field cannot be empty";
    }
}


    async function handler(e){
        e.preventDefault();

        const data = {
            b_name,b_type
        }

        try {
    
            const response = await fetchWrapper("http://localhost:3000/api/workspace",{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(data)
            })

            if(response.ok){
                route.push('/dashboard');
            }

            else{
                setError("Problems??");
                return;
            }


        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className={styles.body}>
            <div className={styles.heading}>
                
                <h1>Create your workspace</h1>
                <h3>Set up your buisness to get started</h3>
            </div>

            <form onSubmit={handler} className={styles.form} method="POST">

                <div className={styles.a}>
                    <label>Business name</label>
                    <input type="text" placeholder="Enter your buisness name" className={styles.field} name="b_name"
                    onChange={(e)=>{setbName(e.target.value),setbNameErr(validateBName(e.target.value))}}
                    />
                    {bNameErr && <p style={{ color: "red", fontSize: "13px" }}>{passwordErr}</p> }
                </div>

                <div className={styles.a}>
                    <label>Business type</label>
                    <select name="b_type" onChange={(e)=>{setbType(e.target.value)}}>
                        <option value="" disabled>
                            Select business option
                        </option>
                        <option value="retail stores"  onClick={()=>setOption(true)}>Retail stores</option>
                        <option value="grocery stores"  onClick={()=>setOption(true)}>Grocery stores</option>
                        <option value="clothing stores"  onClick={()=>setOption(true)}>Clothing stores</option>
                        <option value="electronics"  onClick={()=>setOption(true)}>Electronics store</option>
                        <option value="pharamacies" onClick={()=>setOption(true)}>Pharmacies</option>
                    </select>
                </div>



                <button type="submit" className={styles.btn} disabled={option}>Create workspace</button>
                {error && <p style={{color:"Red", fontSize:"16px"}}>{error}</p>}
            </form>

        </div>
    )

}