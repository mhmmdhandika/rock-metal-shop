import { Suspense } from 'react'
import Header from "@/partials/home/Header";
import ShoppingProductListServer from "@/components/ShoppingProductList/ServerComponent";
import Loading from '@/components/Loading'

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
      </Suspense> 
      <Suspense fallback={<Loading />}>
        <ShoppingProductListServer limit={12} />
      </Suspense> 
    </>
  );
}
