import {
  AiOutlineShoppingCart as CartIcon,
  AiOutlineSearch as SearchIcon,
} from "react-icons/ai";
import { MdOutlineFavoriteBorder as FavoriteIcon } from "react-icons/md";
import Link from "next/link";

function Product({ item }) {
  return (
    <div
      key={item.id}
      className="group relative flex flex-col justify-center overflow-hidden bg-slate-100"
    >
      <img src={item.img} alt={item.title} className="w-full px-5" />
      <div className="duration-800 ease absolute z-10 h-full w-full bg-black/30  opacity-0 transition-all group-hover:opacity-100">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="mb-2 text-center text-lg font-semibold text-white">
            {item.title}
          </h1>
          <div className="flex w-full items-center justify-center gap-3">
            <button className="ease rounded-full bg-white p-2 transition-all duration-300 hover:scale-125">
              <CartIcon size={20} />
            </button>
            <Link
              href={`/product/${item._id}`}
              className="ease rounded-full bg-white p-2 transition-all duration-300 hover:scale-125"
            >
              <SearchIcon size={20} />
            </Link>
            <button className="ease rounded-full bg-white p-2 transition-all duration-300 hover:scale-125">
              <FavoriteIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
