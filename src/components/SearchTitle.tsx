"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchTitle() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const[searchTitle , setSearchTitle]=useState("")

    const handleSearchTitle=()=>{
        const currentSearchParams = new URLSearchParams(searchParams)
        currentSearchParams.set("title" , searchTitle)
        router.push(`/store?${currentSearchParams}`)
    }
  return (
    <div className="mb-4">
        <input onChange={e=>setSearchTitle(e.target.value)} type="text" placeholder="Search Title" className="px-2 border-4 border-s-sky-950 mr-4" />
        <button onClick={handleSearchTitle}
        className="bg-sky-950 text-white h-8 px-2">SEARCH</button>
    </div>
  );
}