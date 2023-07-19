import Product from "@/components/ShoppingProductList/Product";

const ORIGIN_URL = process.env.NEXT_PUBLIC_ORIGIN_URL;

async function getProducts(limit) {
  try {
    let response;
    if (limit) {
      response = await fetch(`${ORIGIN_URL}/api/products?limit=${limit}`, {
        method: "GET",
      });
    } else {
      response = await fetch(`${ORIGIN_URL}/api/products`, {
        method: "GET",
      });
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    return error;
  }
}

export default async function ShoppingProductList(props) {
  const products = await getProducts(props.limit);

  return (
    <div className="section-space-x my-5">
      <div className="grid grid-cols-1 justify-between gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {products?.map((item, index) => (
          <Product item={item} key={index} />
        ))}
      </div>
    </div>
  );
}
