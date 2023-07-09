import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
            default: 1,
          },
          size: {
            type: String,
          },
          color: {
            type: String,
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
