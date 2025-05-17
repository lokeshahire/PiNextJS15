import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog, { IBlog } from "@/lib/models/Blog";
import { auth } from "@/lib/auth";

interface CreateBlogRequest {
  title: string;
  content: string;
  category: "school" | "university" | "general";
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

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();
    const user = await auth(req);
    if (user.role !== "author") {
      return NextResponse.json(
        { message: "Only authors can create blogs" },
        { status: 403 }
      );
    }

    const { title, content, category }: CreateBlogRequest = await req.json();
    if (!title || !content || !category) {
      return NextResponse.json(
        { message: "Title, content, and category are required" },
        { status: 400 }
      );
    }

    const blog: IBlog = new Blog({
      title,
      content,
      category,
      authorID: user._id,
    });
    await blog.save();
    console.log(`Blog created: ${title}`);

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

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    console.error("Create blog error:", error);
    return NextResponse.json(
      { message: "Server error: Failed to create blog" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    const category = searchParams.get("category");

    const filter: any = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (category) filter.category = { $regex: category, $options: "i" };

    console.log("Fetching blogs with filter:", filter);
    const blogs = await Blog.find(filter).populate({
      path: "authorID",
      select: "name",
      model: "users", // Explicitly specify the collection
    });

    if (!blogs) {
      console.log("No blogs found");
      return NextResponse.json([]);
    }

    const response: BlogResponse[] = blogs.map((blog) => {
      if (!blog.authorID) {
        console.warn(`Blog ${blog._id} has no valid authorID`);
      }
      return {
        _id: blog._id.toString(),
        title: blog.title,
        content: blog.content,
        category: blog.category,
        authorID: blog.authorID?.toString() || "",
        author: blog.authorID
          ? {
              _id: blog.authorID._id.toString(),
              name:
                typeof blog.authorID === "object" && "name" in blog.authorID
                  ? (blog.authorID as { name: string }).name
                  : "Unknown",
            }
          : { _id: "", name: "Unknown" },
        createdAt: blog.createdAt.toISOString(),
        updatedAt: blog.updatedAt.toISOString(),
      };
    });

    console.log(`Fetched ${blogs.length} blogs`);
    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Fetch blogs error:", error.stack);
    return NextResponse.json(
      { message: `Server error: Failed to fetch blogs - ${error.message}` },
      { status: 500 }
    );
  }
}
