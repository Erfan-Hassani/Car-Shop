import Container from "@/components/Container";
import { IProduct } from "../page";
import AddToCart from "@/components/AddToCart";

interface IProductProps{
    params:Promise<{id:string}>,
    searchParams:Promise<{}>
}
export default async function product({params , searchParams}:IProductProps) {
   const pageId=(await params).id;
    const response = await fetch(`http://localhost:8000/Products/${pageId}`)
    const product =(await response.json()) as IProduct
  return (
  <Container>
      <div className="h-80 w-full  grid grid-cols-12 content-center">
        
        <div className=" col-span-8 h-full p-4">
           <h2 className="font-extrabold ml-2">{product.title}</h2>
           <p className="my-3">{product.discription}</p>
           <div className="bg-sky-950 inline-block py-2 px-4 text-white"  >price : {product.price} $</div>
        </div>
        <div className="  col-span-4 h-full  ">
             <img className="mb-4" src={product.image} alt="car" 
             />
             <AddToCart id = {pageId}/>
        </div>
    </div>
  </Container>
  );
}