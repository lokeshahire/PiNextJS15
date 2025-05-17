import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User, { IUser } from "@/lib/models/User";
import jwt from "jsonwebtoken";

interface LoginRequest {
  name: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    name: string;
    role: string;
    id: string;
  };
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();
    const { name, password }: LoginRequest = await req.json();

    const user: IUser | null = await User.findOne({ name });
    if (!user || password !== "pass123") {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user._id }, "lokesh", {
      expiresIn: "1d",
    });

    const response: LoginResponse = {
      token,
      user: { name: user.name, role: user.role, id: user.id.toString() },
    };

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
