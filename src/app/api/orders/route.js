import { NextResponse } from 'next/server';
import Order from '@/models/Order';
import connectToMongoDB from '@/lib/mongodb';
import { verifyToken, verifyTokenAndAdmin } from '@/helpers/verifyToken';
import VerifyTokenError from '@/errors/VerifyTokenError';

// GET ALL ORDERS
export async function GET(request) {
  const token = request.headers.get('token');

  try {
    await connectToMongoDB();

    const userTokenData = await verifyTokenAndAdmin(token);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    const orders = await Order.find();
    return NextResponse.json({
      data: orders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}

// CREATE A NEW ORDER
export async function POST(request) {
  const token = request.headers.get('token');
  const body = await request.json();

  try {
    await connectToMongoDB();

    const userTokenData = await verifyToken(token);

    if (userTokenData.error) {
      console.log(userTokenData);
      return userTokenData;
      // throw new VerifyTokenError(userTokenData.message, {
      //   status: userTokenData.status,
      // });
    }

    const savedOrder = await Order.create(body);

    return NextResponse.json({
      data: savedOrder,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}
