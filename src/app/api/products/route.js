import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import connectToMongoDB from '@/lib/mongodb';
import { verifyTokenAndAdmin } from '@/helpers/verifyToken';
import VerifyTokenError from '@/errors/VerifyTokenError';

// GET ALL PRODUCTS
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const newestQuery = searchParams.get('newest');
  const categoryQuery = searchParams.get('category');
  const limitQuery = searchParams.get('limit')

  try {
    await connectToMongoDB();

    let products;

    if (newestQuery) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (categoryQuery) {
      products = await Product.find({
        categories: {
          $in: [categoryQuery],
        },
      });
    } else {
      if (limitQuery) {
        products = await Product.find().limit(limitQuery);
      } else {
        products = await Product.find();
      }
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}

// ADD NEW PRODUCT
export async function POST(request) {
  const token = request.headers.get('token');
  const body = await request.json();

  try {
    await connectToMongoDB();

    const userTokenData = await verifyTokenAndAdmin(token);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    const newProduct = await Product.create(body);

    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}
