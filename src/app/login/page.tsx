"use client"
import Container from "@/components/Container";
import axios from "axios";
import { useState } from "react";
import Cooki from "js-cookie"
import { redirect } from "next/navigation";
export default function login() {
    const[userName , setUserName]=useState("")
    const[passWord , setPassWord]=useState("")
    const handleLoginBtn=()=>{
        // axios({
    //   url:"",
    //   method:"POST",
    //   data:{
    //     username:userName,
    //     password:passWord
    //   }
    // })

    const response= {
      token:"jdshflkasjhflajhdflkasjhdhflkjsahdf",
      expire:7
    }
    Cooki.set("token" , response.token , {expires : response.expire})
    redirect("/dashboard")
    }
  
  return (
    <Container>
          <div className="h-60 w-2/4 mx-auto bg-sky-950 flex flex-col justify-center items-center ">
            <input onChange={e=>setUserName(e.target.value)} className=" h-8 bg-white w-3/4 px-2" type="text" placeholder="USERNAME"/>
            <input onChange={e=>setPassWord(e.target.value)} className="my-2 h-8 bg-white w-3/4 px-2" type="password"  placeholder="PASSWORD" />
            <button onClick={handleLoginBtn} className="text-white bg-red-700 px-2 py-1">LOGIN</button>
            </div>
    </Container>
  
  );
}