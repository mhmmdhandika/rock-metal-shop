import { NextResponse } from 'next/server';
import Product from '@/models/Product'
import Wishlist from '@/models/Wishlist';
import connectToMongoDB from '@/lib/mongodb';
import { verifyToken } from '@/helpers/verifyToken';
import VerifyTokenError from '@/errors/VerifyTokenError';

// GET ALL USER'S WISHLIST
export async function GET(request) {
  try {
    await connectToMongoDB()

    const token = request.headers.get('token')
    const userTokenData = await verifyToken(token)

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status
      })
    }

    const userWishlist = await Wishlist.findOne({ userId: userTokenData.id }).populate('products.product').exec();

    return NextResponse.json({
      data: userWishlist
    })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    ); 
  }
}

// ADD NEW WISHLIST
export async function POST(request) {
  try {
    await connectToMongoDB()
    
    const token = request.headers.get('token');
    const { productId } = await request.json();

    const userTokenData = await verifyToken(token);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status
      })
    }

    let userWishlist = await Wishlist.findOne({ userId: userTokenData.id })

    // if the user wishlist doesn't exist create a new one
    if (!userWishlist) {
      userWishlist = new Wishlist({ userId: userTokenData.id, products: [] })
    }

    // check if the product is already exist in the user's wishlist
    const existingProduct = userWishlist.products.find((item) => item.product.equals(productId))

    if (existingProduct) {
      throw new Error('The product is already on your wishlist')
    }

    // add the product into wishlist
    userWishlist.products.push({
      product: productId
    })

    // save the changes
    await userWishlist.save()

    const getUpdateWishlistPopulated = await Wishlist.findOne({
      userId: userTokenData.id
    })
      .populate('products.product')
      .exec();

    return NextResponse.json({
      data: getUpdateWishlistPopulated
    })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}
