import { NextResponse } from "next/server";
import Order from "@/models/Order";
import connectToMongoDB from "@/lib/mongodb";
import { verifyTokenAndAdmin } from "@/helpers/verifyToken";
import VerifyTokenError from "@/errors/VerifyTokenError";

// GET MONTHLY INCOME
export async function GET(request) {
  const token = request.headers.get("token");
  console.log(token);

  try {
    await connectToMongoDB();

    const userTokenData = await verifyTokenAndAdmin(token);

    if (userTokenData.error) {
      console.log(userTokenData);
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    const income = await Order.aggregate([
      {
        $match: { createdAt: { $gte: previousMonth } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    return NextResponse.json({
      data: income,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}
