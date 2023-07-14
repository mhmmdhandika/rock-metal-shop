"use client";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllCartItem } from "@/redux/actions/cartSlice";
import { useSession } from "next-auth/react";
import { getAllWishlist } from "@/redux/actions/wishlistSlice";

export default function FirstUserRequest({ children }) {
  const dispatch = useDispatch();

  const { data: session, status } = useSession();

  // // get cart items
  // useEffect(() => {
  //   console.log(session);
  //   if (status === "authenticated") {
  //     const fetchCartItems = () => {
  //       dispatch(getAllCartItem({ token: session?.user.accessToken }));
  //     };
  //     // fetch cart items immediately when the component mounts
  //     fetchCartItems();
  //
  //     // fetch cart items every 60 seconds
  //     const intervalId = setInterval(fetchCartItems, 60 * 1000);
  //
  //     // clean up the interval on component unmount
  //     return () => clearInterval(intervalId);
  //   }
  // }, [status]);
  //
  // // get wishlist
  // useEffect(() => {
  //   if (status === "authenticated") {
  //     const fetchWishlist = () => {
  //       dispatch(getAllWishlist({ token: session?.user.accessToken }));
  //     };
  //     fetchWishlist();
  //
  //     const intervalId = setInterval(fetchWishlist, 60 * 1000);
  //
  //     return () => clearInterval(intervalId);
  //   }
  // }, [status]);

  return children;
}
