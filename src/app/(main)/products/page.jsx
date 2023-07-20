"use client";

import ShoppingProductListClient from "@/components/ShoppingProductList/ClientComponent";
import ShoppingProductListLoading from "@/components/ShoppingProductList/Loading";
import { Suspense } from "react";

function ProductList() {
  return (
    <>
      <Suspense fallback={<ShoppingProductListLoading />}>
        <ShoppingProductListClient />
      </Suspense>
    </>
  );
}
export default ProductList;
