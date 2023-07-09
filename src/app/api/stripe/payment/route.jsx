import { NextResponse } from "next/server";
import User from "@/models/User";
import connectToMongoDB from "@/lib/mongodb";
import { verifyTokenAndAdmin } from "@/helpers/verifyToken";
import VerifyTokenError from "@/errors/VerifyTokenError";
import Product from "@/models/Product";
import Stripe from "stripe";

const { NEXT_PUBLIC_ORIGIN_URL } = process.env;

export async function POST(request, context) {
  await connectToMongoDB();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const body = await request.json();

  const lineItems = []
  for (let product of body) {
    const selectedProduct = await Product.findById(product.id);
    lineItems.push({
      price_data: {
        currency: 'usd',
product_data: { name: selectedProduct.title },
        unit_amount: selectedProduct.price * 100
      },
      quantity: product.quantity
    })
  }
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${NEXT_PUBLIC_ORIGIN_URL}/payment/success`,
    cancel_url: `${NEXT_PUBLIC_ORIGIN_URL}/payment/cancel`,
  });
  console.log(session)
  return NextResponse.json({ url: session.url });
}
