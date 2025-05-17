import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import User, { IUser } from "./models/User";

interface DecodedToken {
  id: string;
}

export async function auth(req: NextRequest): Promise<IUser> {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new Error("Auth token missing");
  }

  try {
    const decoded = jwt.verify(token, "lokesh") as unknown as DecodedToken;
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch {
    throw new Error("Invalid token");
  }
}

export function authorizeRole(role: "author" | "customer") {
  return async (req: NextRequest): Promise<IUser> => {
    const user = await auth(req);
    if (user.role !== role) {
      throw new Error("Forbidden");
    }
    return user;
  };
}
