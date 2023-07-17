"use client";

import { useState } from "react";
import ShoppingProductListClient from "@/components/ShoppingProductList/ClientComponent";
import ShoppingProductListLoading from "@/components/ShoppingProductList/Loading";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ProductList() {
  const productParams = useSearchParams();

  const categoryProductParams = productParams.get("category");

  const colorOption = [
    {
      name: "White",
      value: "white",
    },
    {
      name: "Black",
      value: "black",
    },
    {
      name: "Red",
      value: "red",
    },
    {
      name: "Green",
      value: "green",
    },
    {
      name: "Blue",
      value: "blue",
    },
    {
      name: "Yellow",
      value: "yellow",
    },
  ];

  const sizeOption = [
    {
      name: "XS",
      value: "XS",
    },
    {
      name: "S",
      value: "S",
    },
    {
      name: "M",
      value: "M",
    },
    {
      name: "L",
      value: "L",
    },
    {
      name: "XL",
      value: "XL",
    },
  ];

  const sortProductOption = [
    {
      name: "Newest",
      value: "newest",
    },
    {
      name: "Price (asc)",
      value: "asc",
    },
    {
      name: "Price (desc)",
      value: "desc",
    },
  ];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="section-space-x mt-5 px-5">
        <h1 className="text-5xl font-bold capitalize">
          {categoryProductParams}
        </h1>
        <form className="my-5 flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-3">
            {" "}
            <select name="color" onChange={handleFilters}>
              <option value="">Color</option>
              {colorOption.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
            <select name="size" onChange={handleFilters}>
              <option value="">Size</option>
              {sizeOption.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            {" "}
            <select onChange={(e) => setSort(e.target.value)}>
              {sortProductOption.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      <Suspense fallback={<ShoppingProductListLoading />}>
        <ShoppingProductListClient
          category={categoryProductParams}
          filters={filters}
          sort={sort}
        />
      </Suspense>
    </>
  );
}
export default ProductList;
