"use client"

import { IProduct } from "@/app/store/page";
import { useShoppingCartContext } from "@/context/ContextProvider";

export default function AddToCart({id}:IProduct) {
   const {cartItems , increaseCartQty,decreaseCartQty,handleRemoveCart,getQtyCart} =useShoppingCartContext()
 
    
  return (
         
          <div className="w-2/4 mx-auto">
          <div className=" h-full text-center flex justify-between items-center">
            <button
              className="w-8 h-8 bg-sky-950
                text-white
                "
                onClick={()=>{decreaseCartQty(parseInt(id))}}
            >
              -
            </button>
            <span className="mx-6 text-sky-950">{getQtyCart(parseInt(id))}</span>
            <button
              className="w-8 h-8 bg-sky-950
                text-white
                "
                 onClick={()=>increaseCartQty(parseInt(id))}
            >
              +
            </button>
            
          </div>
          <button onClick={()=>handleRemoveCart(parseInt(id))} className="block h-8 w-full mt-2 bg-red-700 text-white ">delet</button>
          </div>
        );
}