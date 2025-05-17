import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User, { IUser } from "@/lib/models/User";

interface SignupRequest {
  name: string;
  password: string;
  role: "author" | "customer";
}

const STATIC_PASSWORD = "pass123";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();
    const { name, role }: SignupRequest = await req.json();

    if (!["author", "customer"].includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    const user: IUser = new User({ name, password: STATIC_PASSWORD, role });
    await user.save();

    return NextResponse.json(
      { message: "User created", user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
