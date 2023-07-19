import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectToMongoDB from '@/lib/mongodb';
import { verifyTokenAndAdmin } from '@/helpers/verifyToken';
import VerifyTokenError from '@/errors/VerifyTokenError';

// GET ALL USERS
export async function GET(request) {
  const token = request.headers.get('token');
  const { searchParams } = new URL(request.url);
  const newestQuery = searchParams.get('newest');

  try {
    await connectToMongoDB();

    const userTokenData = await verifyTokenAndAdmin(token);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    const users = newestQuery
      ? await User.find().sort({ _id: -1 }).limit(newestQuery)
      : await User.find();

    return NextResponse.json({
      data: users,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}
