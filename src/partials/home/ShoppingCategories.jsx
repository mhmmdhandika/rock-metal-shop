import { shoppingCategories } from "@/data/content";
import Link from "next/link";

function ShoppingCategories() {
  return (
    <div className="mb-2 mt-5">
      <div className="section-space-x grid gap-2 md:grid-cols-3">
        {shoppingCategories.map((category) => (
          <div key={category.id} className="relative h-[30rem]">
            <img
              src={category.img}
              alt={category.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <p className="mb-3 text-2xl">{category.title}</p>
              <Link
                href={{
                  pathname: "products",
                  query: { category: category.name },
                }}
                className="border border-white px-3 py-2"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ShoppingCategories;
