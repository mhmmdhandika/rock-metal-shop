"use client";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllCartItem } from "@/redux/actions/cartSlice";
import { useSession } from "next-auth/react";

export default function FirstUserRequest({ children }) {
  const dispatch = useDispatch();

  const { data: session } = useSession();
  console.log(session)

  useEffect(() => {
    const fetchCartItems = () => {
      if (session) {
        dispatch(getAllCartItem({ token: session?.user.accessToken }));
      }
    }
    // fetch cart items immediately when the component mounts
    fetchCartItems();

    // fetch cart items every 10 seconds
    const intervalId = setInterval(fetchCartItems, 10 * 1000)

    // clean up the interval on component unmount
    return () => clearInterval(intervalId)
  }, [session]);

  return children;
}
