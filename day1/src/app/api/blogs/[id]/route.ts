import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog, { IBlog } from "@/lib/models/Blog";
import { auth } from "@/lib/auth";

interface UpdateBlogRequest {
  title?: string;
  content?: string;
  category?: "school" | "university" | "general";
}

interface BlogResponse {
  _id: string;
  title: string;
  content: string;
  category: string;
  authorID: string;
  author: { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await connectDB();
    const blog = await Blog.findById(params.id).populate<{
      authorID: { _id: any; name: string };
    }>("authorID", "name");
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const response: BlogResponse = {
      _id: blog._id.toString(),
      title: blog.title,
      content: blog.content,
      category: blog.category,
      authorID: blog.authorID._id.toString(),
      author: { _id: blog.authorID._id.toString(), name: blog.authorID.name },
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Fetch blog error:", error.message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await connectDB();
    const user = await auth(req);
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    if (
      user.role !== "author" ||
      blog.authorID.toString() !== user.id.toString()
    ) {
      return NextResponse.json(
        { message: "Not allowed to update this blog" },
        { status: 403 }
      );
    }

    const { title, content, category }: UpdateBlogRequest = await req.json();
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (category) blog.category = category;

    await blog.save();
    console.log(`Blog updated: ${blog.title}`);

    const response: BlogResponse = {
      _id: blog._id.toString(),
      title: blog.title,
      content: blog.content,
      category: blog.category,
      authorID: blog.authorID.toString(),
      author: { _id: user.id.toString(), name: user.name },
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Update blog error:", error.message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await connectDB();
    const user = await auth(req);
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    if (
      user.role !== "author" ||
      blog.authorID.toString() !== user.id.toString()
    ) {
      return NextResponse.json(
        { message: "Not allowed to delete this blog" },
        { status: 403 }
      );
    }

    await blog.deleteOne();
    console.log(`Blog deleted: ${blog.title}`);

    return NextResponse.json({ message: "Blog deleted" });
  } catch (error: any) {
    console.error("Delete blog error:", error.message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
