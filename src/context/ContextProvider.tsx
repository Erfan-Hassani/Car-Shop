"use client"
import Navbar from "@/components/Navbar";
import { useContext, useState, createContext, useEffect } from "react";

type ShoppingCartContext = {
  cartItems: CartItems[];
  increaseCartQty: (id: number) => void;
  decreaseCartQty: (id: number) => void;
  handleRemoveCart: (id: number) => void;
  handleTotalQty: ()=>number
  getQtyCart: (id: number) => number;
};

export type CartItems = {
  id: number;
  qty: number;
};

const shoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCartContext = () => {
  return useContext(shoppingCartContext);
};
export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  const getQtyCart = (id: number) => {
    return cartItems.find((item) => item.id == id)?.qty || 0;
  };

  const increaseCartQty = (id: number) => {
    setCartItems((currectItems) => {
      const isNotExist = currectItems.find((item) => item.id == id);
      if (isNotExist == null) {
        return [...currectItems, { id: id, qty: 1 }];
      } else {
        return currectItems.map((item) => {
          if (item.id == id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const decreaseCartQty = (id: number) => {
    setCartItems((currectItems) => {
      const hasOnce = currectItems.find((item) => item.id == id)?.qty;
      if (hasOnce == 1) {
        return currectItems.filter((item) => item.id != id);
      } else {
        return currectItems.map((item) => {
          if (item.id == id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const handleRemoveCart=(id:number)=>{
    setCartItems( cartItems.filter(item=>item.id!=id))
     
  }
  const handleTotalQty = ()=>{
   return cartItems.reduce((totalQtv , item)=>{
      return totalQtv + item.qty
    } , 0)
  }
 useEffect( ()=>{
   const getLocalstorageCart= localStorage.getItem("cartitems")
   if(getLocalstorageCart){
    setCartItems(JSON.parse( getLocalstorageCart))
   }
   
  }, [])

  useEffect(()=>{
    localStorage.setItem("cartitems" , JSON.stringify(cartItems))
  } ,[cartItems])

 

  return (
    <shoppingCartContext.Provider
      value={{ cartItems, increaseCartQty, decreaseCartQty,handleRemoveCart,handleTotalQty,getQtyCart }}
    >
      <Navbar/>
      {children}
    </shoppingCartContext.Provider>
  );
}
