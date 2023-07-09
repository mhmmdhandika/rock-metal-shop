"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Product from "@/components/Product";

const ORIGIN_URL = process.env.NEXT_PUBLIC_ORIGIN_URL;

function ShoppingProductList({ category, filters, sort }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const url = category
        ? `${ORIGIN_URL}/api/products?category=${category}`
        : `${ORIGIN_URL}/api/products`;
      try {
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <div className="section-space-x">
      <div className="grid justify-between gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {category
          ? filteredProducts.map((item, index) => (
              <Product item={item} key={index} />
            ))
          : products.map((item, index) => <Product item={item} key={index} />)}
      </div>
    </div>
  );
}
export default ShoppingProductList;
