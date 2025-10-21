import { useShoppingCartContext } from "@/context/ContextProvider";
import Link from "next/link";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";



export default function Navbar() {
  const {handleTotalQty}=useShoppingCartContext()
  const [onMenu , setOnMenu]=useState(true)
  const handleChangeOnMenu=()=>{
    setOnMenu(!onMenu)
  }
  return (
    <nav className="w-full h-20 bg-sky-950 mb-6 ">
      <div className="w-5/8 mx-auto h-full text-white  relative flex justify-center items-center  md:justify-between ">
      <Link  href={"/"}>LOGO</Link>

          {/* this is menu button */}

      {onMenu?< HiMenu className="absolute size-5 -right-0 md:hidden " onClick={handleChangeOnMenu}/>:<HiX className="absolute size-5 -right-0 md:hidden" onClick={handleChangeOnMenu}/>}
      

          {/* this is backGround for close menu */}

        <div className= { `w-full h-full bg-sky-950  fixed top-20 left-0 z-20 transition-opacity duration-700 ease-in-out ${onMenu ? "opacity-0 pointer-events-none" :  "opacity-60"} 
        md:hidden` }onClick={handleChangeOnMenu} >
        </div>

            {/* this is menu */}

      <div className= {`flex flex-col  items-center justify-between bg-sky-950 absolute top-full z-30 py-4 px-2 h-56 transition-all duration-700 ease-in-out  ${onMenu ?  'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'} 
        md:static md:pointer-events-auto md:flex-row md:justify-between md:items-center md:p-0 md:h-full md:translate-y-0
        md:w-3/4 md:opacity-100  ` 
        } >

    

          <Link className=""  href={"/"}>
          Home
        </Link>
        <Link className=""  href={"/login"}>
          Login
        </Link>
        <Link className="" href={"/store"}>
          Store
        </Link>
        <Link  className="" href={"/dashboard"}> Dashboard </Link>
        <Link  className="" href={"/shopping-cart"}>
          Shopping Cart
          <div className=" ml-1 w-4 h-4 inline-flex justify-center items-center bg-red-700 text-white  rounded-full " >{handleTotalQty()}</div>
        </Link>
        <div onClick={()=>{
          Cookies.remove("token")
          redirect("/")
        }} className=" text-red-700 cursor-pointer">Exit</div>

      </div>
        
      </div>
    </nav>
  );
}



