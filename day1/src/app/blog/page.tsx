"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const fetchBlogs = async () => {
    try {
      let url = "http://localhost:8080/blogs";

      const res = await fetch(url);
      const data = await res.json();
      setBlogs(data);
      console.log("Blogs fetched successfully:", data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [query, category]);

  return (
    <div>
      <h1>Blogs</h1>

      <input
        placeholder="Search by title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All</option>
        <option value="school">School</option>
        <option value="university">University</option>
        <option value="general">General</option>
      </select>

      {/* <div>
        {blogs.map((blog: any) => (
          <div key={blog._id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <small>Category: {blog.category}</small>
            <br />
            <small>Author: {blog.authorName || blog.authorID?.name}</small>
          </div>
        ))}
      </div> */}

      <div className="w-1/3 mx-auto">
        {blogs.map((blog: any) => (
          <Card key={blog._id} className="my-5">
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
              <CardDescription>{blog.content}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Category: {blog.category}</p>
            </CardContent>
            <CardFooter>
              <p>Author: {blog.author.name || blog.authorID?.name}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
