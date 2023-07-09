import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

export default configureStore({
  reducer: {
    cart: cartSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
