import { NextResponse } from 'next/server';
import connectToMongoDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashSync } from 'bcrypt';

export async function POST(request) {
  try {
    await connectToMongoDB();

    const body = await request.json();

    const { firstName, lastName, username, email, password } = body;

    const isUserExists = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExists) {
      if (isUserExists.username === username) {
        throw new Error('Username is already existed');
      }

      if (isUserExists.email === email) {
        throw new Error('Email is already existed');
      }
    }

    const hashedPassword = hashSync(password, 12);

    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ ...newUser._doc });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
