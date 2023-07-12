import Product from "@/components/ShoppingProductList/Product";
import axios from "axios";
// import { getServerSession } from "next-auth/next"
// import nextAuthOptions from '@/options/next-auth' 

const ORIGIN_URL = process.env.NEXT_PUBLIC_ORIGIN_URL;

async function getProducts(limit) {
  try {
    let response;
    if (limit) {
      response = await axios.get(`${ORIGIN_URL}/api/products?limit=12`);
    } else {
      response = await axios.get(`${ORIGIN_URL}/api/products`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
}

export default async function ShoppingProductList(props) {
  const products = await getProducts(props.limit);

  return (
    <div className="section-space-x my-5">
      <div className="grid justify-between gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {products?.map((item, index) => (
          <Product item={item} key={index} />
        ))}
      </div>
    </div>
  );
}
