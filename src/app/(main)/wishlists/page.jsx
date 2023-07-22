import { getServerSession } from "next-auth/next";
import nextAuthOptions from "@/options/next-auth";
import ActionButtons from "@/components/ShoppingProductList/ActionButtons";
import { redirect } from "next/navigation";
import connectToMongoDB from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import Product from "@/models/Product";
import Wishlist from "@/models/Wishlist";
import Link from "next/link";

const { SECRET_KEY } = process.env;

async function getWishlistItems(token) {
  try {
    await connectToMongoDB();

    const verifyToken = jwt.verify(token, SECRET_KEY);
    const userWishlist = await Wishlist.findOne({ userId: verifyToken.id })
      .populate("products.product")
      .exec();

    return { data: userWishlist };
  } catch (error) {
    return { error };
  }
}

export default async function WishlistsPage() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) redirect("/login");

  const userWishlist = JSON.parse(
    JSON.stringify(await getWishlistItems(session?.user.accessToken))
  );

  if (userWishlist?.error) {
    return (
      <div className="section-space-x flex h-screen flex-col items-center justify-center gap-3 text-center">
        <h1 className="max-w-[30rem] text-xl">{userWishlist.error.message}</h1>
        <Link href="/" className="border border-black px-2 py-1">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="my-5">
      <div className="section-space-x">
        {/* card products container */}
        <div className="mx-auto grid max-w-[25rem] items-center gap-2 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* card product */}
          {userWishlist.data.products.length > 1 ? (
            userWishlist.data.products.map((item, index) => (
              <div
                key={index}
                className="group relative flex aspect-square h-full w-full flex-col justify-center overflow-hidden bg-slate-100"
              >
                <img
                  src={item.product.img[0]}
                  alt={item.product.title}
                  className="mx-auto w-full px-5"
                />
                <div className="duration-800 ease absolute z-10 h-full w-full bg-black/30  opacity-0 transition-all group-hover:opacity-100">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h1 className="mb-2 text-center text-lg font-semibold text-white">
                      {item.product.title}
                    </h1>
                    <ActionButtons
                      itemId={item.product._id}
                      product={item.product}
                    />
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
