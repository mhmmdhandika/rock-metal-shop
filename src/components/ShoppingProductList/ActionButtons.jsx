"use client";

import {
  AiOutlineShoppingCart as CartIcon,
  AiOutlineSearch as SearchIcon,
} from "react-icons/ai";
import { MdOutlineFavoriteBorder as FavoriteIcon } from "react-icons/md";
import Link from "next/link";

export default function ActionButton({ itemId }) {
  return (
    <div className="flex w-full items-center justify-center gap-3">
      <button className="ease rounded-full bg-white p-2 transition-all duration-300 hover:scale-125">
        <CartIcon size={20} />
      </button>
      <Link
        href={`/product/${itemId}`}
        className="ease rounded-full bg-white p-2 transition-all duration-300 hover:scale-125"
      >
        <SearchIcon size={20} />
      </Link>
      <button className="ease rounded-full bg-white p-2 transition-all duration-300 hover:scale-125">
        <FavoriteIcon size={20} />
      </button>
    </div>
  );
}
