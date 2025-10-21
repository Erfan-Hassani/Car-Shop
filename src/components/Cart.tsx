"use client"
import { IProduct } from "@/app/store/page";
import AddToCart from "./AddToCart";
import { useEffect, useState } from "react";
import axios from "axios";

interface ICartProps{
      id:number,
      qty:number
}
export default function Cart({id,qty}:ICartProps) {
      const [data , setData]=useState <IProduct>({} as IProduct )

      useEffect(()=>{
            axios.get(`http://localhost:8000/Products/${id}`).then(
                  res=>setData(res.data)),[]}
            )
  return (
          <div  className=" h-32 w-full mb-4 border-4 border-sky-950 flex justify-between items-center ">
               <img className="w-4/12 h-full object-cover object-center" src={data.image} alt="" />
        <div>
              <h2 className="mb-2">{data?.title}</h2>
            <div className="">{data?.price} $</div>
        </div>
              <div className="w-4/12"><AddToCart id= {id.toString()}/></div>
        
        </div>
  );
}