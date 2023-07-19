import mongoose from "mongoose";

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
    img: [
      {
        type: String,
        required: true,
      }
    ],
    categories: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    colors: [String],
    sizes: [String],
    stock: [
      {
        color: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

// middleware to update colors and sizes before saving a product
ProductSchema.pre("save", function (next) {
  const uniqueColors = [
    ...new Set(this.stock.map((stockItem) => stockItem.color)),
  ];
  this.colors = uniqueColors;

  const uniqueSizes = [
    ...new Set(this.stock.map((stockItem) => stockItem.size)),
  ];
  this.sizes = uniqueSizes;

  next();
});

export default Product;
