"use client";

import styles from "./page.module.css"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import fetchWrapper from "../lib/fetchWrapper"
export default function Dashboard(){
    const route = useRouter();

    async function data(e){
        e.preventDefault();
    const response = await fetchWrapper("/api/test");

    if(response.status==401){
        route.push("/login");
    }
    if(response.status==404){
        console.log("Wrong url");
        return;
    }

    if(response.status==500){
        console.log("Server not working try again later");
        return;
    }
    if(response.ok){
    const info = await response.json();
    console.log(info);
    }


    }


    return(

        <button type="button" onClick={data}>Show me data</button>
    )
}