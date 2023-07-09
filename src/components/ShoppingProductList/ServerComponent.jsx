import Product from "@/components/Product";
import axios from "axios";

const ORIGIN_URL = process.env.NEXT_PUBLIC_ORIGIN_URL

async function getProducts(limit) {
  try {
    let response;
    if (limit) {
      response = await axios.get(`${ORIGIN_URL}/api/products?limit=12`)
    } else {
      response = await axios.get(`${ORIGIN_URL}/api/products`)
    }
    return response.data
  } catch (error) {
    return error
  }
}

export default async function ShoppingProductList({ limit }) {
  const products = await getProducts(limit)

  return (
    <div className="section-space-x">
      <div className="grid justify-between gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {products?.map((item, index) => <Product item={item} key={index} />)}
      </div>
    </div>
  );
}
