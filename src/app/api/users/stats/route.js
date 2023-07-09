import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectToMongoDB from '@/lib/mongodb';
import { verifyTokenAndAdmin } from '@/helpers/verifyToken';
import VerifyTokenError from '@/errors/VerifyTokenError';

export async function GET(request) {
  const token = request.headers.get('token');
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    await connectToMongoDB();

    const userTokenData = verifyTokenAndAdmin(token);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: '$createdAt' } } },
      { $group: { _id: '$month', total: { $sum: 1 } } },
    ]);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}
