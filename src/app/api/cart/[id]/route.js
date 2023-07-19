import { NextResponse } from 'next/server';
import Cart from '@/models/Cart';
import connectToMongoDB from '@/lib/mongodb';
import {
  verifyToken,
  verifyTokenAndAuthorization,
} from '@/helpers/verifyToken';
import VerifyTokenError from '@/errors/VerifyTokenError';

// GET A USER CART
export async function GET(request, context) {
  const token = request.headers.get('token');
  const paramId = context.params.id;

  try {
    await connectToMongoDB();

    const cart = await Cart.findOne({ userId: paramId });

    return NextResponse.json({
      data: cart,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE A CART
export async function POST(request, context) {
  const token = request.headers.get('token');
  const paramId = context.params.id;
  const body = await request.json();

  try {
    await connectToMongoDB();

    const userTokenData = await verifyTokenAndAdmin(token);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    const updatedCart = await Cart.findByAndUpdate(
      paramId,
      {
        $set: body,
      },
      { new: true }
    );

    return NextResponse.json({
      data: updatedCart,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}
