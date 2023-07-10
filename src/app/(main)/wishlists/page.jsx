"use client";

import { userRequest } from "@/axios/requestMethods";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineShoppingCart as CartIcon } from "react-icons/ai";
import { BsTrash3 as TrashIcon } from "react-icons/bs";

export default function WishlistsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (session) {
      const fetchWislistProducts = async () => {
      const response = await userRequest(session?.user.accessToken).get("/api/wishlist");
      setProducts(response.data.products);
      };
      fetchWislistProducts();
      console.log(products)
      }
  }, [session]);

  return (
    <div>
      <div className="section-space-x">
        {/* card products container */}
        <div className="mx-auto grid max-w-[25rem] items-center gap-5 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* card product */}
          {products.length > 1 ? (
            products.map((item) => (
              <div>
                <div>
                  <img src={item.product.img} alt={item.product.title} />
                </div>
                <div className="grid grid-cols-[auto_20%] gap-2">
                  <div className="flex flex-col gap-4">
                    <Link
                      href={`/product/${item.product._id}`}
                      className="block max-w-[15rem] truncate text-3xl font-bold hover:underline"
                    >
                      {item.product.title}
                    </Link>
                    <div className="flex gap-2">
                      {item.product?.color.map((color) => (
                        <div
                          className="h-7 w-7 rounded-full"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-4">
                    <h3 className="text-3xl">${item.product.price}</h3>
                    <div className="flex gap-2">
                      <button className="rounded-md border-2 border-black p-2">
                        <CartIcon size={18} />
                      </button>
                      <button className="rounded-md border-2 border-black p-2">
                        <TrashIcon size={18} />
                      </button>
                    </div>
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
