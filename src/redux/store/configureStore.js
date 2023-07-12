import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../actions/cartSlice.js";
import wishlistSlice from "../actions/wishlistSlice.js";

export default configureStore({
  reducer: {
    cart: cartSlice,
    wishlist: wishlistSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
