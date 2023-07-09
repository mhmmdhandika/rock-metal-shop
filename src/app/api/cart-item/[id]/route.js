import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import connectToMongoDB from "@/lib/mongodb";
import { verifyToken } from "@/helpers/verifyToken";
import VerifyTokenError from "@/errors/VerifyTokenError";

// INCREASE OR DECREASE A QUANTITY ITEM CART
export async function POST(request, context) {
  try {
    await connectToMongoDB();
    const operationItem = request.nextUrl.searchParams.get("operation");

    const token = request.headers.get("token");
    const cartItemId = context.params.id;

    const userTokenData = await verifyToken(token);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    const userCart = await Cart.findOne({ userId: userTokenData.id });
    const itemCart = userCart.products.find((item) =>
      item._id.equals(cartItemId)
    );

    if (!itemCart) {
      throw new Error("Cannot found cart item");
    }

    if (operationItem === "increase") {
      itemCart.quantity += 1;
    } else if (operationItem === "decrease") {
      itemCart.quantity -= 1;
    } else {
      throw new Error("Operation item is not valid!");
    }

    const updatedCart = await userCart.save();

    const getUpdateCartPopulated = await Cart.findOne({
      userId: userTokenData.id,
    }).populate('products.product').exec()

    return NextResponse.json(getUpdateCartPopulated);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}

// DELETE AN ITEM CART
export async function DELETE(request, context) {
  try {
    await connectToMongoDB();

    const token = request.headers.get("token");
    const cartItemId = context.params.id;

    const userTokenData = await verifyToken(token);

    if (userTokenData.error) {
      throw new VerifyTokenError(userToken.message, {
        status: userTokenData.status,
      });
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { userId: userTokenData.id },
      { $pull: { products: { _id: cartItemId } } },
      { new: true }
    )
      .populate("products.product")
      .exec();

    return NextResponse.json(updatedCart);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}
