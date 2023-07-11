"use client";

import { userRequest } from "@/axios/requestMethods";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiFillHeart as FillHeartIcon } from "react-icons/ai";
import { AiOutlineShoppingCart as CartIcon } from "react-icons/ai";
import { BsTrash3 as TrashIcon } from "react-icons/bs"
import ActionButtons from "@/components/ShoppingProductList/ActionButtons";


export default function WishlistsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (session) {
      const fetchWislistProducts = async () => {
        const response = await userRequest(session?.user.accessToken).get(
          "/api/wishlist"
        );
        setProducts(response.data.products);
      };
      fetchWislistProducts();
      console.log(products);
    }
  }, [session]);

  return (
    <div>
      <div className="section-space-x">
        {/* card products container */}
        <div className="mx-auto grid max-w-[25rem] items-center gap-2 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* card product */}
          {products.length > 1 ? (
            products.map((item, index) => (
              <div
                key={index}
                className="group relative flex flex-col justify-center overflow-hidden bg-slate-100"
              >
                <img
                  src={item.product.img}
                  alt={item.product.title}
                  className="w-full px-5"
                />
                <div className="duration-800 ease absolute z-10 h-full w-full bg-black/30  opacity-0 transition-all group-hover:opacity-100">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h1 className="mb-2 text-center text-lg font-semibold text-white">
                      {item.product.title}
                    </h1>
                    <ActionButtons itemId={item.id} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>No products</h1>
          )}
        </div>
      </div>
    </div>
  );
}
