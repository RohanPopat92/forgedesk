"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

import Link from "next/link";


export default function Login(){
    const [email, setEmail ] = useState(0);
  const [password, setPassword] = useState(0);

  function handler(e){
    e.preventDefault();
  }

  return(
    <div>Home</div>
  )

}
