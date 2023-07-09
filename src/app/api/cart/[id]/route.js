import { NextResponse } from 'next/server';
import Cart from '@/models/Cart';
import connectToMongoDB from '@/lib/mongodb';
import {
  verifyToken,
  verifyTokenAndAuthorization,
} from '@/helpers/verifyToken';
import VerifyTokenError from '@/errors/VerifyTokenError';

// GET A USER CART
export async function GET(request, context) {
  const token = request.headers.get('token');
  const paramId = context.params.id;

  try {
    await connectToMongoDB();

    const cart = await Cart.findOne({ userId: paramId });

    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE A CART
export async function POST(request, context) {
  const token = request.headers.get('token');
  const paramId = context.params.id;
  const body = await request.json();

  try {
    await connectToMongoDB();

    const userTokenData = await verifyTokenAndAdmin(token);

    if (userTokenData.error) {
      throw new VerifyTokenError(userTokenData.message, {
        status: userTokenData.status,
      });
    }

    const updatedCart = await Cart.findByAndUpdate(
      paramId,
      {
        $set: body,
      },
      { new: true }
    );

    return NextResponse.json(updatedCart);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.data?.status ?? 500 }
    );
  }
}

// DELETE AN ITEM CART
// export async function DELETE(request, context) {
//   try {
//     await connectToMongoDB();
//
//     const token = request.headers.get('token');
//     const cartItemId = context.params.id
//
//     const userTokenData = await verifyToken(token);
//
//     if (userTokenData.error) {
//       throw new VerifyTokenError(userToken.message, {
//         status: userTokenData.status,
//       });
//     }
//
//     const userCart = await Cart.findOne({ userId: userTokenData.id })
//
//     if (!userCart) {
//       throw new Error('Cart not found')
//     }
//
//     const cartItem = userCart.products.find(item => item)
//
//     return NextResponse.json();
//   } catch (error) {
//     return NextResponse.json(
//       { error: error.message },
//       { status: error?.data?.status ?? 500 }
//     );
//   }
// }
