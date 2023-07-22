import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllWishlist = createAsyncThunk(
  "wishlist/getAllWishlist",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/wishlist", {
        method: 'GET',
        headers: {
          token: `Bearer ${token}`
        }
      })
      const result = await response.json();
      return result.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response.status
      })
    }
  }
)

export const addWishlistItem = createAsyncThunk(
  "wishlist/addWishlistItem",
  async ({ token, productId, product }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/wishlist", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: `Bearer ${token}`
        },
        body: JSON.stringify({ productId })
      })
      const result = await response.json();
      return result.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response.status
      }) 
    }
  }
)

export const deleteWishlistItem = createAsyncThunk(
  'wishlist/deleteWishlistItem',
  async ({ token, productId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          token: `Bearer ${token}`
        }
      })
      const result = await response.json();
      return result.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response.status
      });
    }
  }
)

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    productInfo: {},
    products: []
  },
  reducers: [],
  extraReducers: (builder) => {
    // get all wishlist
    builder.addCase(getAllWishlist.fulfilled, (state, action) => {
      const { products, ...otherData } = action.payload;
      state.productInfo = otherData
      state.products = products
    })
    // add new wishlist item
    builder.addCase(addWishlistItem.fulfilled, (state, action) => {
      const { products, ...otherData } = action.payload;
      state.productInfo = otherData;
      state.products = products;
      console.log('successfully adding a new item');
    })
    builder.addCase(addWishlistItem.rejected, (state, action) => {
      console.log(action)
    })
    // delete wishlist item
    builder.addCase(deleteWishlistItem.fulfilled, (state, action) => {
      const { products, ...otherData } = action.payload;
      state.productInfo = otherData;
      state.products = products;
      console.log('successfully deleted the item');
    })
  }
})

export default wishlistSlice.reducer;
