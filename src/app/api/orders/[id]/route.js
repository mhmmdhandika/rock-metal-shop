import { NextResponse } from 'next/server';
import Order from '@/models/Order';
import connectToMongoDB from '@/lib/mongodb';
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '@/helpers/verifyToken';
import VerifyTokenError from '@/errors/VerifyTokenError';

// GET A USER ORDERS
export async function GET(request, context) {
  const token = request.headers.get('token');
  const paramId = context.params.userId;

  try {
    await connectToMongoDB();

    const userTokenData = await verifyTokenAndAuthorization(token, paramId);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    const orders = await Order.find({ userId: paramId });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}

// UPDATE A ORDER
export async function PUT(request, context) {
  const token = request.headers.get('token');
  const paramId = context.params.id;
  const body = await request.json();

  try {
    await connectToMongoDB();

    const userTokenData = await verifyTokenAndAdmin(token, paramId);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      paramId,
      { $set: body },
      { new: true }
    );

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}

// DELETE USER ORDER
export async function DELETE(request, context) {
  const token = request.headers.get('token');
  const paramId = context.params.id;

  try {
    await connectToMongoDB();

    const userTokenData = await verifyTokenAndAdmin(token.paramId);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    await Order.findByIdAndDelete(paramId);

    return NextResponse.json('Order has been deleted...');
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}
