"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewItemCart } from "@/redux/actions/cartSlice";
import Swal from "sweetalert2";
import { createSelector } from '@reduxjs/toolkit'
import { useSession } from "next-auth/react";

const selectCart = (state) => state.cart

function Product({ params }) {
 const { data: session } = useSession();

  const dispatch = useDispatch();

  const cart = useSelector(selectCart);
  const idProduct = params.id;

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [selectedItemPrice, setSelectedItemPrice] = useState(null);
  const [selectedItemQuantity, setSelectedItemQuantity] = useState(null);

  const getFormattedPriceRange = () => {
    if (product?.stock) {
      const prices =  product?.stock.map((item) => item.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return `$${minPrice} - $${maxPrice}`;
    }
  };

  useEffect(() => {
    const selectedItem = product?.stock && product?.stock.find((item) => item.color === color && item.size === size);
    if (selectedItem) {
      setSelectedItemPrice(selectedItem.price);
      setSelectedItemQuantity(selectedItem.quantity);
    }
  }, [size, color]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`/api/products/${idProduct}`, {
          method: 'GET',
        });
        const result = await response.json();
        setProduct(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [idProduct]);

  const handleQuantity = (type) => {
    if (color === '' || size === '') {
      Swal.fire({
        title: 'Please select color and size first!',
        icon: 'warning',
      })
    } else {
      if (type === "dec") {
        quantity > 1 && setQuantity(quantity - 1);
      } else {
        setQuantity(quantity + 1);
      }
    }
  };

  const handleAddToCart = async () => {
    // if user signed in
    if (session) {
      // if user have choosed color and size
      if (color === "" || size === "") {
        Swal.fire({
          title: "Please select color or size",
          icon: "warning",
        });
      } else {
        const newItem = {...product, quantity, color, size}
        dispatch(addNewItemCart({ token: session.user.accessToken, newItem }))      }
    } else {
      Swal.fire({
        title: 'You are not signed in yet',
        text: 'Please sign in, before choosing your product',
        icon: 'warning'
      })
    }
  };

  return (
    <div className="section-space-x grid gap-10 px-5 mb-10 md:grid-cols-2">
      <div className="relative aspect-square overflow-hidden md:sticky md:top-20">
        {product.img && product.img[0] && (
          <img src={product.img[0]} alt={product.title} className="h-full w-full object-cover object-center" />
        )}
      </div>
      <div className="flex grow flex-col gap-5 pt-10">
        <h1 className="text-4xl font-medium capitalize md:text-5xl">
          {product.title}
        </h1>
        <h2 className="my-3 text-7xl font-extralight" style={{ wordSpacing: '-15px' }}>{getFormattedPriceRange()}</h2>
        <div dangerouslySetInnerHTML={{ __html: product.desc }} className="my-3 product-desc" />
        <div className="flex gap-5 items-center">
          {selectedItemQuantity && selectedItemPrice ? (
            <> 
              <div>
                Stock: <span className="font-semibold">{selectedItemQuantity}</span> 
              </div>
              <div>
                Price: <span className="font-semibold">{`$${selectedItemPrice}`}</span>
              </div>
            </>
          ) : (
            <div>Stock & price: Select color and size first</div>
          )} 
        </div>
        <form>
          <div className="flex items-center gap-14">
            {/* color option */}
            <div className="flex items-center gap-3">
              {product?.colors?.map((item, index) => (
                <div
                  key={index}
                  className={`h-10 w-10 rounded-full ${
                    color === item && "border-4 outline outline-blue-600"
                  }`}
                  style={{
                    backgroundColor: item,
                  }}
                  onClick={() => setColor(item)}
                ></div>
              ))}
            </div>
            {/* size option */}
            <div>
              <span className="mr-3 text-lg">Size</span>
              <select onChange={(e) => setSize(e.target.value)}>
                <option>Select size</option>
                {product?.sizes?.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </div>
          </div>
          {/* quantity option */}
          <div className="mt-10 flex gap-10">
            <div className="flex gap-3">
              <button
                type="button"
                className="text-2xl font-semibold"
                onClick={() => handleQuantity("dec")}
              >
                -
              </button>
              <span className="flex aspect-square h-10 w-10 items-center justify-center rounded-md border-2 border-slate-300 text-lg">
                {quantity}
              </span>
              <button
                type="button"
                className="text-2xl font-semibold"
                onClick={() => handleQuantity("inc")}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className={`border px-4 py-2 ${cart.isLoading ? 'cursor-not-allowed' : 'cursor-pointer' }`}
              onClick={handleAddToCart}
              disabled={cart.isLoading}
            >
              ADD TO CART
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Product;
