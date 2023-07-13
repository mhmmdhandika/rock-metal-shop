"use client";

import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import {
  AiFillHeart as FillHeartIcon,
  AiOutlineHeart as OutlineHeartIcon,
} from "react-icons/ai";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import {
  addWishlistItem,
  deleteWishlistItem,
} from "@/redux/actions/wishlistSlice";

const selectWishlist = createSelector(
  (state) => state.wishlist,
  (wishlistSlice) => wishlistSlice
);

export default function ActionButton({ itemId, product }) {
  const dispatch = useDispatch();

  const { data: session, status } = useSession();
  const wishlist = useSelector(selectWishlist);

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      wishlist.products.map((item) => {
        if (item.product._id === itemId) {
          setIsWishlisted(true);
        }
      });
    }
  }, [wishlist]);

  const handleWishlist = async (itemId) => {
    if (status === "authenticated") {
      if (isWishlisted) {
        // delete item from wishlist
        dispatch(
          deleteWishlistItem({
            token: session.user.accessToken,
            productId: itemId,
          })
        );
      } else {
        // add item to wishlist
        dispatch(
          addWishlistItem({
            token: session?.user.accessToken,
            productId: itemId,
            product,
          })
        );
      }
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
        {isWishlisted ? (
          <FillHeartIcon size={20} color="red" />
        ) : (
          <OutlineHeartIcon size={20} />
        )}
      </button>
    </div>
  );
}
