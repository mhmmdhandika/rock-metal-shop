import { Suspense } from "react";
import Header from "@/partials/home/Header";
import ShoppingProductListServer from "@/components/ShoppingProductList/ServerComponent";
import ShoppingProductListLoading from "@/components/ShoppingProductList/Loading";
import Loading from "@/components/Loading";
import Link from "next/link";
import { AiOutlineArrowRight as ArrowRight } from 'react-icons/ai'

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
      </Suspense>
        <Suspense fallback={<ShoppingProductListLoading />}> 
        <div className="section-space-x mt-5 flex justify-between items-center">
          <h2 className="text-xl">Featured products</h2>
          <Link href="/products" className="py-1 px-2 text-lg flex items-center gap-2 hover:underline">Show all <ArrowRight size={15}/></Link>
        </div>
        <ShoppingProductListServer
          limit={12}
        />
      </Suspense>
    </>
  );
}
