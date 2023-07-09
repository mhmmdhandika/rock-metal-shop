import { NextResponse } from "next/server";
import Product from '@/models/Product';
import Cart from "@/models/Cart";
import connectToMongoDB from "@/lib/mongodb";
import { verifyToken } from "@/helpers/verifyToken";
import VerifyTokenError from "@/errors/VerifyTokenError";

// GET ALL CARTS
export async function GET(request) {
  try {
    await connectToMongoDB();

    const token = request.headers.get("token");
    const userTokenData = await verifyToken(token);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    const carts = await Cart.findOne({ userId: userTokenData.id })
      .populate("products.product")
      .exec();

    return NextResponse.json(carts);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}

// ADD NEW CART
export async function POST(request) {
  try {
    await connectToMongoDB();

    const token = request.headers.get("token");
    const body = await request.json();

    const userTokenData = await verifyToken(token);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    const cartItemData = {
      product: body.productId,
      quantity: body.quantity,
      size: body.size,
      color: body.color,
    };

    let userCart = await Cart.findOne({ userId: userTokenData.id });

    // if the user cart doesn't exist, create a new one
    if (!userCart) {
      userCart = new Cart({ userId: userTokenData.id, products: [] });
    }

    // Check if the product already exists in the user's cart
    const existingProduct = userCart.products.find(
      (item) =>
        item.product.equals(cartItemData.product) &&
        item.size === cartItemData.size &&
        item.color === cartItemData.color
    );

    if (existingProduct) {
      // If the product already exists, you can update its quantity
      existingProduct.quantity += cartItemData.quantity;
    } else {
      // if the product doesn't exist, add it to the user's cart
      userCart.products.push(cartItemData);
    }

    // save the updated cart
    const updatedCart = await userCart.save();

    const getUpdateCartPopulated = await Cart.findOne({
      userId: userTokenData.id,
    })
      .populate("products.product")
      .exec();

    return NextResponse.json(getUpdateCartPopulated);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}
