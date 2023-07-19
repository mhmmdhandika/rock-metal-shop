import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectToMongoDB from "@/lib/mongodb";

export async function POST(request) {
  try {
    await connectToMongoDB();

    const products = await Product.find( { $text: { $search: 'slipknot' } } );

    return NextResponse.json({
      data: products,
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
