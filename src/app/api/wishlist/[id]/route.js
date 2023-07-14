import { NextResponse } from 'next/server';
import Product from '@/models/Product'
import Wishlist from '@/models/Wishlist';
import connectToMongoDB from '@/lib/mongodb';
import { verifyToken } from '@/helpers/verifyToken';
import VerifyTokenError from '@/errors/VerifyTokenError';

// DELETE A WISHLIST
export async function DELETE(request, context) {
  try {
    await connectToMongoDB()

    const token = request.headers.get('token');
    const productId = context.params.id;
    const userTokenData = await verifyToken(token);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status
      }) 
    }

    const userWishlist = await Wishlist.findOneAndUpdate(
      { userId: userTokenData.id },
      { $pull: { products: { product: productId } } },
      { new: true }
    )
      .populate('products.product')
      .exec();

    return NextResponse.json({
      data: userWishlist
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    ); 
  }
}
