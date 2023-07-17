import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    size: Array,
    color: Array,
    price: {
      type: Number,
      required: true,
    },
    stock: [
      {
        color: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true },
      }
    ]
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
