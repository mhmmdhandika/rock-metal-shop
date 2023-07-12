"use client";

import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import { MdOutlineFavoriteBorder as FavoriteIcon } from "react-icons/md";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ActionButton({ userId, itemId }) {
  const { data: session, status } = useSession();

  const handleWishlist = async (itemId) => {
    if (status === "authenticated") {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify({
          productId: itemId,
        }),
      });
      const result = await response.json();
    } else {
      console.log("you are not authenticated");
    }
  };

  return (
    <div className="flex w-full items-center justify-center gap-3">
      <Link
        href={`/product/${itemId}`}
        className="ease rounded-full bg-white p-2 transition-all duration-300 hover:scale-125"
      >
        <SearchIcon size={20} />
      </Link>
      <button
        className="ease rounded-full bg-white p-2 transition-all duration-300 hover:scale-125"
        onClick={() => handleWishlist(itemId)}
      >
        <FavoriteIcon size={20} />
      </button>
    </div>
  );
}
