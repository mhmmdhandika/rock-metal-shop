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
      return await response.json()
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
      return await response.json()
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
      return await response.json()
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
      const { products, ...otherData } = action.payload.data
      state.productInfo = otherData
      state.products = products
    })
    // add new wishlist item
    builder.addCase(addWishlistItem.pending, (state, { meta }) => {
      state.products.push({
        _id: null,
        product: meta.arg.product,
      })
    })
    builder.addCase(addWishlistItem.fulfilled, (state, action) => {
      const { products, ...otherData } = action.payload.data;
      state.productInfo = otherData;
      state.products = products;
    })
    builder.addCase(addWishlistItem.rejected, (state, action) => {
      console.log(action)
    })
    // delete wishlist item
    builder.addCase(deleteWishlistItem.pending, (state, action) => {
      state.products = state.products.filter((item) => (
        item.product._id !== action.meta.arg.productId
      ))
    })
    builder.addCase(deleteWishlistItem.fulfilled, (state, action) => {
      const { products, ...otherData } = action.payload.data;
      console.log(products)
      state.productInfo = otherData;
      state.products = products;
    })
  }
})

export default wishlistSlice.reducer;
