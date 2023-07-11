import ActionButtons from "@/components/ShoppingProductList/ActionButtons";

const { NEXT_PUBLIC_ORIGIN_URL } = process.env

async function getWishlistItems(token) {
  const response = await fetch(`${NEXT_PUBLIC_ORIGIN_URL}/api/wishlist`, {
    method: "GET",
    headers: {
      token: `Bearer ${token}`,
    },
  });
  const result = await response.json()
  console.log(result)
  return result
}

export default async function WishlistsPage({ params: { token } }) {
  const userWishlist = await getWishlistItems(token)

  return (
    <div>
      <div className="section-space-x">
        {/* card products container */}
        <div className="mx-auto grid max-w-[25rem] items-center gap-2 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* card product */}
          {userWishlist.products.length > 1 ? (
            userWishlist.products.map((item, index) => (
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
