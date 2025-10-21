import Container from "@/components/Container";
import Pagination from "@/components/Pagination";
import SearchTitle from "@/components/SearchTitle";
import Link from "next/link";

export interface IProduct {
  id: string;
  title?: string;
  discription?: string;
  image?: string;
  price?: number;
}
export interface IProductList {
  first: number | null;
  prev: number | null;
  next: number | null;
  last: number | null;
  pages: number;
  items: number | null;
  data: IProduct[];
}
interface IStoreProps{
  Params : Promise<{}>
  searchParams : Promise<{
    _page:string;
    _per_page:string;
    title:string
  }>
}
export default async function store({searchParams}:IStoreProps) {
  
  const page = (await searchParams)._page ||1
  const perPage= (await searchParams)._per_page ||4
  const title = (await searchParams).title || ""
 
  
  const response = await fetch(`http://localhost:8000/Products?_page=${page}&_per_page=${perPage}&title=${title}`);
  const products = (await response.json()) as IProductList;

 
   

  return (
    <Container>
      <SearchTitle/>
      <div className="grid grid-cols-2 gap-6 mb-4 md:grid-cols-4">
        {products.data.map((item) => {
          return (
            <Link key={item.id} href={`/store/${item.id}`}>
              <div className="h-60 border-6  border-sky-950 flex-col">
               
                <img
                  className="h-1/2 w-full object-cover"
                  src={item.image}
                  alt="car"
                />
                
               <div className="bg-sky-950  w-full h-1/2  text-white p-2 flex flex-col justify-evenly">
                 <h2 className="border p-1 border-white">{item.title}</h2>
                <p className="border p-1 border-white">
                  price: <span>{item.price}$</span>
                </p>
               </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Pagination/>
    </Container>
  );
}
