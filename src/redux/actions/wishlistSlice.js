import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    products: []
  },
  reducers: []
})

export default wishlistSlice.reducer;
