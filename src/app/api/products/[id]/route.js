import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import connectToMongoDB from '@/lib/mongodb';
import { verifyTokenAndAdmin } from '@/helpers/verifyToken';
import VerifyTokenError from '@/errors/VerifyTokenError';

// GET A PRODUCT
export async function GET(request, context) {
  const paramId = context.params.id;

  try {
    await connectToMongoDB();

    const product = await Product.findById(paramId);

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE A PRODUCT
export async function PUT(request, context) {
  try {
    await connectToMongoDB();

    const token = request.headers.get('token');
    const paramId = context.params.id;

    // verify token
    const userTokenData = await verifyTokenAndAdmin(token);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message);
    }

    const body = await request.json();

    const updatedUser = await Product.findByIdAndUpdate(paramId, body, {
      new: true,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}

// DELETE A USER
export async function DELETE(request, context) {
  const token = request.headers.get('token');
  const paramId = context.params.id;

  try {
    const userData = await verifyTokenAndAdmin(token);

    if (userData.error) {
      throw new VerifyTokenError(userData.message, { status: userData.status });
    }

    await Product.findByIdAndDelete(paramId);

    return NextResponse.json({ result: 'Product has been deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}
