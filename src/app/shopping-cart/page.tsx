"use client";
import Container from "@/components/Container";
import { IProduct } from "../store/page";
import { useShoppingCartContext } from "@/context/ContextProvider";
import Cart from "@/components/Cart";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatWithSeparator } from "@/utils/Seperator";

interface IDiscount{
  id:string,
  code: string,
  percentage:number
  
}

export default function shoppingCart() {
  const { cartItems } = useShoppingCartContext();
  const [data, setData] = useState<IProduct[]>([]);
  const [discountCode, setDiscountCode] = useState("")
  const [profit, setProfit] = useState<number>(0)
  const [finallyPrice, setfinallyPrice] =  useState<number>(0)
  
  const totalPrice =   cartItems.reduce((totalPrice , item)=>{
             const selectedData=data.find(dataItem => dataItem.id==item.id.toString())
              return totalPrice + (selectedData?.price || 0 )* item.qty
            },0)
        const handleDiscount=()=>{
          axios(`http://localhost:8000/Discount`).then((res)=>{
               const data :IDiscount[] =res.data
               const percentage=   data.find(item=>item.code == discountCode)?.percentage 
               const profit= totalPrice*(percentage || 0)/100 
               const finallyPrice=totalPrice-profit
               setProfit(profit)
                setfinallyPrice(finallyPrice)
          }
          )
        }
  useEffect(() => {
    axios.get("http://localhost:8000/Products").then((res) => {
      setData(res.data);
    });
  }, []);
 
  return (
    <Container>
      {cartItems.map((item) => {
        return <Cart key={item.id} {...item} />;
      })}

      <div className="bg-sky-950 p-4">
      
        <div className="text-white">
          Total Price : <span>{
            formatWithSeparator(totalPrice)
            } $</span>
        </div>
         <div className=" text-white">Your Profit : <span>{formatWithSeparator(profit)}</span> $</div>
       <div className=" text-white">Finally price : <span>{formatWithSeparator(finallyPrice)}</span> $ </div>
       <input onChange={e=>setDiscountCode(e.target.value)} type="text" placeholder="Discount code " className=" px-2 h-6 bg-white"  />

       <button onClick={handleDiscount} className="h-6 bg-red-700 text-white ml-2 px-2"> CHECK </button>
      </div>
    </Container>
  );
}
