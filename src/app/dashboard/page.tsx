"use client"
import Container from "@/components/Container";
import axios from "axios";

import { ChangeEvent, useState } from "react";

export default function dashboard() {
    const [newProduct , setNewProduct]=useState({
        title : "",
        discription:"",
        image: "",
        price:""
    })
    const handleChangeInput=(e :ChangeEvent<HTMLInputElement |HTMLTextAreaElement>)=>{
       const {value , name}= e.target
       
       setNewProduct(
        {
          ...newProduct,
          [name]:value
        }
       )
    }

    const handleSubmitNewProduct=()=>{
        axios({
          method:"POST",
          url:"http://localhost:8000/Products",
          data:{
            id:Math.floor(Math.random()*1000).toString(),
            ...newProduct
          }
        })

        setNewProduct({
        title : "",
        discription:"",
        image: "",
        price:""
        })
        
    }
  return (
   <Container>
        <div className="bg-sky-950 p-4">
            <div className="h-10 grid grid-cols-3 gap-4">
            <input onChange={(e)=>handleChangeInput(e)} name="title" className="bg-white text-sky-950 px-2" type="text" placeholder="title" value={newProduct.title}/>
            <input onChange={(e)=>handleChangeInput(e)} name="price" className="bg-white text-sky-950 px-2" type="text" placeholder="price" value={newProduct.price}/>
            <input onChange={(e)=>handleChangeInput(e)} name="image" className="bg-white text-sky-950 px-2" type="text" placeholder="image" value={newProduct.image}/></div>
            <textarea onChange={(e)=>handleChangeInput(e)} name="discription" className="bg-white text-sky-950 w-full h-40 px-2 my-4" placeholder="discription"  value={newProduct.discription}></textarea>
            <button onClick={handleSubmitNewProduct} className="bg-red-700 text-white p-2">Submit</button>
        </div>
   </Container>
  );
}