import { userRequest } from "@/axios/requestMethods";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const getAllCartItem = createAsyncThunk(
  "cart/getAllCartItem",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await userRequest(token).get("/api/cart");
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response.status,
      });
    }
  }
);

export const addNewItemCart = createAsyncThunk(
  "cart/addNewItemCart",
  async ({ token, newItem }, { rejectWithValue }) => {
    try {
      const response = await userRequest(token).post("/api/cart", {
        productId: newItem._id,
        quantity: newItem.quantity,
        size: newItem.size,
        color: newItem.color
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response.status,
      });
    }
  }
);

export const deleteItemCart = createAsyncThunk(
  "cart/deleteItemCart",
  async ({ token, itemId }, { rejectWithValue }) => {
    try {
      const response = await userRequest(token).delete(`/api/cart-item/${itemId}`)
      return response.data
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        data: error
      })
    }
  }
)

export const updateQuantityItemCart = createAsyncThunk(
  "cart/updateQuantityItemCart",
  async ({ token, itemId, operation }, { rejectWithValue }) => {
    try {
      const response = await userRequest(token).post(`/api/cart-item/${itemId}?operation=${operation}`)
      return response.data
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        data: error
      })
    }
  }
)

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    products: [],
    totalQuantity: 0,
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    // get all of cart items
    builder.addCase(getAllCartItem.fulfilled, (state, action) => { 
      let totalQuantity = 0
      if (action.payload.products.length !== 0) {
        // reset products to prevent add a products item from previous state
        state.products = [];
        action.payload.products.map(item => {
          state.products.push(item)
          totalQuantity += item.quantity
        })
      }
      state.totalQuantity = totalQuantity;
    }),
    builder.addCase(getAllCartItem.rejected, () => {
      Swal.fire({
        icon: 'error',
        title: 'Failed to fetch cart items',
        toast: true,
        position: 'top-end',
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    }),
    builder.addCase(addNewItemCart.rejected, (state, action) => {
      state.isLoading = false;
      Swal.fire({
        title: 'error',
        text: "Cannot add the product to the cart, please try again!",
        icon: "error",
      });
    }),
    // delete a cart item
    builder.addCase(deleteItemCart.rejected, (state, action) => {
      console.log(action)
    }),
    // update a quantity cart item (increase / decrease)
    builder.addCase(updateQuantityItemCart.pending, (state, { meta }) => {
      // using optimistic UI for faster update UI
      const cartItem = state.products.find((item) => item._id === meta.arg.itemId)
      if (meta.arg.operation === 'increase') {
        cartItem.quantity += 1;
        state.totalQuantity += 1
      } else if (meta.arg.operation === 'decrease') {
        cartItem.quantity -= 1;
        state.totalQuantity -= 1
      }
    }),
    builder.addCase(updateQuantityItemCart.rejected, (state, action) => {
      console.log(action)
    })
  },
});

export default cartSlice.reducer;
