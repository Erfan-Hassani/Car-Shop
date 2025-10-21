"use client"
import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

export default function Pagination () {
      const searchParams = useSearchParams()
      const router = useRouter();

  const handlePageClick = (event: { selected: number }) => {
    const selectedPage = event.selected + 1;
    const currentSearchParams = new URLSearchParams(searchParams)
    currentSearchParams.set("_page" , selectedPage.toString() )
    currentSearchParams.set("_per_page" , "4")
    router.push(`/store?${currentSearchParams}`);
  };

  return (
    <ReactPaginate
        pageCount={2}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName="flex gap-2 justify-center"
        pageClassName="w-10 h-10 border-4 border-sky-950 cursor-pointer "
        pageLinkClassName="w-full h-full flex items-center justify-center"
        activeClassName="bg-sky-950 text-white"
        previousLabel="prev"
        nextLabel="next"
        previousClassName=" bg-sky-950 text-white cursor-pointer"
        previousLinkClassName="w-full h-full px-2 flex items-center justify-center"
        nextClassName="px-2 bg-sky-950 text-white cursor-pointer"
        nextLinkClassName="w-full h-full px-2 flex items-center justify-center"
        // forcePage={currentPage - 1}
      />
  );
}