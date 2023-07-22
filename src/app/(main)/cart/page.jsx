"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from 'next/navigation';
import { BiTrash as TrashIcon } from 'react-icons/bi'
import { deleteItemCart, updateQuantityItemCart } from "@/redux/actions/cartSlice";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const selectCart = (state) => state.cart;

function Cart() {
  const dispatch = useDispatch()
  const router = useRouter()

  const cart = useSelector(selectCart);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    };
  }, []);

  const getTotalPrice = () => {
    let total = 0;

    cart.products.forEach((item) => {
      const price = item.product.price * item.quantity;
      total += price;
    })
    
    return total;
  };

  const handleCheckout = async () => {
    try {
      const selectedProducts = cart.products.map((item) => ({
        id: item.product._id,
        quantity: item.quantity,
      }));
      const response = await fetch("/api/stripe/payment", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedProducts),
      });
      const result = await response.json();
      window.location.assign(result.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItemCart = async (itemId) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure want to delete the item cart?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#d33',
      showCancelButton: true,
    })
    if (confirmDelete.isConfirmed) {
      dispatch(deleteItemCart({ token: session?.user.accessToken, itemId }))
    }
  } 

  const handleUpdateQuantityCartItem = async (itemId, operation, itemQuantity) => {
    if (itemQuantity <= 1) {
      handleDeleteItemCart(itemId) 
    } else {
      dispatch(updateQuantityItemCart({
        token: session?.user.accessToken,
        itemId,
        operation
      }))
    }
  }

  return (
    <main className="section-space-x my-5">
      {/* title section */}
      <section>
        <h1 className="text-center text-4xl">YOUR BAG</h1>
      </section>
      {/* action buttons */}
      <section className="my-5 flex items-center justify-between">
        <Link
          href="/products"
          className="text-md border-2 border-black px-2 py-1"
        >
          CONTINUE SHOPPING
        </Link>
        <button
          className="text-md border-2 border-black bg-black px-2 py-1 text-white"
          onClick={handleCheckout}
        >
          CHECKOUT NOW
        </button>
      </section>
      {/* order section */}
      <section className="grid gap-5 md:grid-cols-[auto_23rem]">
        {/* product details */}
        <div>
          {/* single product */}
          {cart?.products?.map((cartItem, index) => {
          return (
            <div key={index} className="grid items-center gap-5 border-b py-3 md:grid-cols-[13rem_auto]">
              <div>
                <img
                  src={cartItem.product.img}
                  alt={cartItem.product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="grid w-full grid-cols-[auto_1fr] justify-between gap-3">
                <div className="flex flex-col gap-2 text-lg">
                  {/* name item */}
                  <h2 className="font-semibold">
                    Product
                    <span className="font-extralight uppercase">
                      : {cartItem.product.title}
                    </span>
                  </h2>
                  {/* id product */}
                  <p className="font-semibold">
                    ID<span>: {cartItem.product._id}</span>
                  </p>
                  {/* color of product */}
                  <div>
                    <div
                      className="h-7 w-7 rounded-full"
                      style={{ backgroundColor: cartItem.color }}
                    ></div>
                  </div>
                  {/* size product */}
                  <div>
                    <p className="font-semibold">
                      Size
                      <span className="font-extralight uppercase">
                        : {cartItem.size}
                      </span>
                    </p>
                  </div>
                </div>
                {/* action buttons and price */}
                <div className="flex flex-col items-end justify-center gap-4">
                  <div className="flex gap-2 text-2xl font-semibold">
                    <button onClick={() => handleUpdateQuantityCartItem(cartItem._id, 'decrease', cartItem.quantity)}>-</button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={() => handleUpdateQuantityCartItem(cartItem._id, 'increase')}>+</button>
                  </div>
                  <div>
                    <span className="text-4xl font-extralight">
                      ${cartItem.product.price * cartItem.quantity}
                    </span>
                  </div>
                  <div>
                    <button className="p-1 border-2 border-red-600" onClick={() => handleDeleteItemCart(cartItem._id)}>
                      <TrashIcon size={20} className="text-red-600"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>
        {/* order summary */}
        <div className="sticky top-20 flex h-fit flex-col gap-3 border p-8">
          <h3 className="text-center text-4xl font-extralight">
            ORDER SUMMARY
          </h3>
          <table className="order-summary-table w-full text-lg">
            <tbody>
            <tr>
              <th>Estimated Shipping</th>
              <td>$0</td>
            </tr>
            <tr>
              <th>Shipping Discount</th>
              <td>$0</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>${getTotalPrice()}</td>
            </tr>
            </tbody>
          </table>
          <button
            className="w-full bg-slate-900 py-2 text-xl text-white"
            onClick={handleCheckout}
          >
            CHECKOUT NOW
          </button>
        </div>
      </section>
    </main>
  );
}

export default Cart;
