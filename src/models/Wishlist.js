import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          }
        }
      ],
      required: true
    }
  },
  { timestamps: true }
)

const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema)

export default Wishlist;
