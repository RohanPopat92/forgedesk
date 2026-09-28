"use client";

import styles from "./page.module.css"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";



export default function Login(){
    const [email, setEmail ] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] =useState("");
    const [emailErr,setEmailErr] =useState("");
    const [passwordErr,setPasswordErr] =useState("");

    const route = useRouter();
    function validateEmail(e){
        const trimemail = e.trim();
        if(trimemail ===""){
            return "Email cannot be empty";
        }

        else if(!/.+@.+/.test(trimemail)){
            return "Please enter a valid email";
        }
    }

    function validatePassword(e){
        if(e===""){
            return "Password cannot be empty";
        }
    }


  async function handler(e){
    e.preventDefault();


    setEmailErr(validateEmail(email))
    setPasswordErr(validatePassword(password))

    const data={
        email,
        password
    };

    try {
    console.log(email);
    console.log(password);
        const response = fetch("http://localhost:3000/api/login",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(data)
    })  
    
        const result = (await response).json;
        

                // if((await response).ok){

                //     route.push('/login');
                // }
                // else{
                //     console.log("4");
                //     setRegErr("User already exists");
                    
                // }        
        if((await response).ok){
            route.push("/dashboard");
        }

        else{
            setError("Your email or password is incorrect");
        }

    } 
    
    catch (error) {
        console.log(error);
    }

  }

 
  return(
    <div className={styles.body}>
       <div className={styles.welcome}>
         <h1>Welcome Back</h1>
         <h4>Sign in to your ForgeDesk workspace</h4>
       </div>


       <form onSubmit={handler} className={styles.form} method="POST">

        <div className={styles.a}>
            <label/>Work Email
            <input type="email" placeholder="you@company.com" name="email" className={styles.field} onChange={(e)=> {setEmail(e.target.value); setEmailErr (validateEmail(e.target.value))}}></input>
            {emailErr && <p style={{ color: "red", fontSize: "13px" }}>{emailErr}</p> }
        </div>

        



        <div className={styles.a}>
            <label/>Password
            <input type="password" placeholder="••••••••••" name="password" className={styles.field} onChange={(e)=> {console.log("INPUT VALUE:", e.target.value);setPassword(e.target.value); setPasswordErr(validatePassword(e.target.value))}}></input>
            {passwordErr && <p style={{ color: "red", fontSize: "13px" }}>{passwordErr}</p> }             
        </div>
         



          <div className={styles.mem}>
            <div className={styles.rem}>
                <label/>Remember Me
                <input type="checkbox" id="checkbox"/>
            </div>


        <Link href="/forgot-password" className={styles.forgotpw}>Forgot password?</Link>

        </div>

        <button type="submit" id={styles.btn}>Sign in</button>
        
        <div className={styles.user}>
            {error && <p style={{color:"red", fontSize:"18px"}}>{error}</p>}
            <div className="idk">
                <span>Don't have an account?</span> <Link href="/register">Create an account</Link>            
            </div>
        </div>


       </form>

    </div>
  )
}