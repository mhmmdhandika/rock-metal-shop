import { NextResponse } from "next/server";
import User from "@/models/User";
import connectToMongoDB from "@/lib/mongodb";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "@/helpers/verifyToken";
import VerifyTokenError from "@/errors/VerifyTokenError";

// GET A USER
export async function GET(request, context) {
  const token = request.headers.get("token");
  const paramId = context.params.id;

  try {
    await connectToMongoDB();

    const userTokenData = await verifyTokenAndAdmin(token);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    const user = await User.findById(paramId);
    const { password, ...userExcludePassword } = user;

    return NextResponse.json({
      data: userExcludePassword,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}

// UPDATE A USER
export async function PUT(request, context) {
  try {
    await connectToMongoDB();

    const token = request.headers.get("token");
    const paramId = context.params.id;

    // verify token
    const userTokenData = await verifyTokenAndAuthorization(token, paramId);

    if (userTokenData.error) {
      console.log(userTokenData);
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    // TODO: encrypt password
    const body = await request.json();

    const updatedUser = await User.findByIdAndUpdate(paramId, body, {
      new: true,
    });

    return NextResponse.json({
      data: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}

// DELETE A USER
export async function DELETE(request, context) {
  const token = request.headers.get("token");
  const paramId = context.params.id;

  try {
    const userTokenData = await verifyTokenAndAuthorization(token, paramId);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    const updatedUser = await User.findByIdAndDelete(paramId);

    return NextResponse.json({
      data: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}
