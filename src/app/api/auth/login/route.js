import { NextResponse } from 'next/server';
import connectToMongoDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    await connectToMongoDB();

    const body = await request.json();

    const user = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });

    if (!user) {
      throw new Error('Cannot find the user');
    }

    const decryptPassword = bcrypt.compareSync(body.password, user.password);

    if (!decryptPassword) {
      throw new Error('Wrong password');
    }

    const { password, ...userExcludePassword } = user._doc;

    return NextResponse.json({ ...userExcludePassword });
  } catch (error) {
    return NextResponse.json({ error: error.message, result: null });
  }
}
