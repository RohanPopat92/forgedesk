"use client";

import styles from "./page.module.css"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Register(){


const [name,setFullName] =useState("");
const [email,setEmail] =useState("");
const [password,setPassword] =useState("");
const [cpassword,setCPassword] =useState("");

    const [emailErr,setEmailErr] =useState("");
    const [passwordErr,setPasswordErr] =useState("");
    const [nameErr,setNameErr] =useState("");
    const [cpasswordErr,setCPasswordErr] =useState("");

    const [regErr,setRegErr] = useState("");


function validateName(e){
    const name =e.trim();
    if(name ===""){
        return "Name field cannot be empty";
    }

    else if(!/^[A-Za-z\s]+$/.test(name)){
        return "Name must only contain letters and spaces";
    }

    else{
        return "";
    }
}

function validateEmail(e){
    const email =e.trim();

    if(email ===""){
        return "Email cannot be empty";
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return "Please enter a valid email address";
    }

    else{
        return "";
    }
}
function validatePassword(e){
    const password =e.trim();

    if(password===""){
        return "Password cannot be empty";
    }

    else if(password.length <8){
        return "Password must be at least 8 characters long";
    }
    else if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/.test(password)){
        return "Password must include a number and a special character";
    }
    else{
        return "";
    }
    
}
function validateCPassword(e){
    const trimcpassword = e.trim();

    if(trimcpassword===""){
        return "Confirm password cannot be empty";
    }

    else if(trimcpassword!==password){
        return "Passwords do not match";
    }
    
    else{
        return "";
    }
}
    const route = useRouter();

async function handler(e) {
        e.preventDefault();

        setNameErr(validateName(name));
        setEmailErr(validateEmail(email));
        setPasswordErr(validatePassword(password));
        setCPasswordErr(validateCPassword(cpassword));

        if(!nameErr && !emailErr && !passwordErr && !cpasswordErr){

            const data ={
                name,
                email,
                password
            }

            try {
                const response = fetch("http://localhost:3000/api/register",{
                    method: "POST",
                    headers:{
                        "Content-type": "application/json"
                    },
                    body:JSON.stringify(data)
                });

                const result = (await response).json;

                if((await response).ok){

                    route.push('/login');
                }
                else{
                    console.log("4");
                    setRegErr("User already exists");
                    
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        
}


    return(
        <div className={styles.body}>
            
            <div className={styles.heading}>
                <h1>Create your account</h1>
                <h4>Join ForgeDesk and manage your workspace.</h4>
            </div>

            <form onSubmit={handler} method="POST" className={styles.form}>

                <div className={styles.a}>
                    <label>Full Name</label>

                    <div className={styles.b}>
                        <input type="text" name="fullname" placeholder="Enter your full name" className={styles.field}
                        onChange={(e) =>{setFullName(e.target.value); setNameErr(validateName(e.target.value))}}
                    />
                    {nameErr && <p style={{ color: "red", fontSize: "13px" }}>{nameErr}</p> }
                    </div>

                </div>

                <div className={styles.a}>
                    <label>Email address</label>

                    <div className={styles.b}>
                        <input type="email" name="email" placeholder="Enter your email" className={styles.field}
                        onChange={(e) =>{setEmail(e.target.value); setEmailErr(validateEmail(e.target.value))}}
                        />
                        {emailErr && <p style={{ color: "red", fontSize: "13px" }}>{emailErr}</p> }
                    </div>

                </div>

                <div className={styles.a}>
                    <label>Password</label>

                    <div className={styles.b}>
                        <input type="password" name="password" placeholder="Create a password" className={styles.field}
                        onChange={(e) =>{setPassword(e.target.value); setPasswordErr(validatePassword(e.target.value))}}
                        />
                        {passwordErr && <p style={{ color: "red", fontSize: "13px" }}>{passwordErr}</p> }
                    </div>

                </div>

                <div className={styles.a}>
                    <label>Confirm Password</label>

                    <div className={styles.b}>
                        <input type="text" name="fullname" placeholder="Enter your password" className={styles.field}
                        onChange={(e) =>{setCPassword(e.target.value); setCPasswordErr(validateCPassword(e.target.value))}}
                        />
                        {cpasswordErr && <p style={{ color: "red", fontSize: "13px" }}>{cpasswordErr}</p> }                        
                    </div>
                </div>
                

                <button type="submit" className={styles.btn}>Create account</button>                                               

                <div className={styles.msg}>
                        {regErr && <p style={{ color:"red", fontSize:"13px"}}>{regErr}</p>}                    
                    <div className={styles.mem}>
                        <span>Already have an account?</span><Link href="/login" id={styles.login}>Log in</Link>
                    </div>
                </div>

            </form>

        </div>
    )
}