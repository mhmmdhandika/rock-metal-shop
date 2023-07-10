import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../actions/cartSlice.js";

export default configureStore({
  reducer: {
    cart: cartSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
