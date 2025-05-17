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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

// Sample image for blog cards (replace with actual images in your app)
const placeholderImage =
  "https://placehold.co/600x400/orange/white?text=Blog+Image";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedBlogs, setEditedBlogs] = useState<any>({});
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    category: "general",
  });

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const fetchBlogs = async () => {
    try {
      let url = `http://localhost:8080/blogs`;
      const params = new URLSearchParams();
      if (query) params.append("title", query);
      if (category) params.append("category", category);
      const res = await fetch(`${url}?${params.toString()}`);
      const data = await res.json();
      setBlogs(data);
      console.log("Fetched blogs:", data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [query, category]);

  const handleEditClick = (blog: any) => {
    setEditingId(blog._id);
    setEditedBlogs({
      title: blog.title,
      content: blog.content,
      category: blog.category,
    });
  };

  const handleSaveClick = async (id: string) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`http://localhost:8080/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedBlogs),
      });

      if (res.ok) {
        setEditingId(null);
        fetchBlogs();
      }
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedBlogs((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteSaveClick = async (id: string) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`http://localhost:8080/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setDeletingId(null);
        fetchBlogs();
      }
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  const handleAddBlog = async () => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch("http://localhost:8080/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBlog),
      });

      if (res.ok) {
        setShowAddModal(false);
        setNewBlog({ title: "", content: "", category: "general" });
        fetchBlogs();
      } else {
        console.error("Failed to add blog:", await res.text());
      }
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const handleCategoryFilter = (selectedCategory: string) => {
    setCategory((prev) => (prev === selectedCategory ? "" : selectedCategory));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 p-6 bg-white shadow-md">
        <h2 className="text-lg font-semibold mb-4">Category </h2>
        <div className="space-y-2">
          {["School", "University", "General"].map((cat) => (
            <div key={cat} className="flex items-center">
              <Checkbox
                id={cat}
                checked={category === cat.toLowerCase()}
                onCheckedChange={() => handleCategoryFilter(cat.toLowerCase())}
              />
              <label htmlFor={cat} className="ml-2 text-sm">
                {cat}
              </label>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold my-5">
            {blogs.length} Blogs Found
          </h1>
          <Input
            className="w-1/1 p-5 border rounded-full"
            placeholder="Search Here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Add Blog Button for Authors */}
        {user?.role === "author" && (
          <div className="mb-6">
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Add Blog
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Blog</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <Input
                    placeholder="Title"
                    value={newBlog.title}
                    onChange={(e) =>
                      setNewBlog((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                  <textarea
                    placeholder="Content"
                    value={newBlog.content}
                    onChange={(e) =>
                      setNewBlog((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    className="w-full border rounded p-2 h-32"
                  />
                  <select
                    value={newBlog.category}
                    onChange={(e) =>
                      setNewBlog((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full border rounded p-2"
                  >
                    <option value="school">School</option>
                    <option value="university">University</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <DialogFooter className="mt-4">
                  <Button
                    disabled={!newBlog.title || !newBlog.content}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleAddBlog}
                  >
                    Submit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Blog Cards */}
        <div className="space-y-6">
          {blogs.map((blog: any) => {
            const isAuthor =
              user?.role === "author" && user?.id === blog.author._id;
            const isEditing = editingId === blog._id;
            const isDeleting = deletingId === blog._id;

            return (
              <Card
                key={blog._id}
                className="flex flex-col md:flex-row items-start bg-white shadow-md rounded-lg overflow-hidden"
              >
                {/* Blog Image */}
                <div className="w-full md:w-1/4">
                  <img
                    src={placeholderImage}
                    alt={blog.title}
                    className="w-full h-40 "
                  />
                </div>

                {/* Blog Content */}
                <div className="flex-1 p-4">
                  <CardHeader className="p-0">
                    {isEditing || isDeleting ? (
                      <input
                        name="title"
                        value={editedBlogs.title}
                        onChange={handleChange}
                        className="w-full border p-1 text-lg font-semibold"
                      />
                    ) : (
                      <CardTitle className="text-lg font-semibold">
                        {blog.title}
                      </CardTitle>
                    )}

                    {isEditing || isDeleting ? (
                      <textarea
                        name="content"
                        value={editedBlogs.content}
                        onChange={handleChange}
                        className="w-full border p-1 mt-2 text-sm text-gray-600"
                      />
                    ) : (
                      <CardDescription className="text-sm text-gray-600">
                        {blog.content}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="p-0 mt-2">
                    {isEditing || isDeleting ? (
                      <select
                        name="category"
                        value={editedBlogs.category}
                        onChange={handleChange}
                        className="w-full border p-1 text-sm"
                      >
                        <option value="school">School</option>
                        <option value="university">University</option>
                        <option value="general">General</option>
                      </select>
                    ) : (
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>
                          📅
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                        <span>⏰ 4 mins read</span>
                      </div>
                    )}
                  </CardContent>

                  <CardContent className="p-0 mt-5">
                    <p className="text-sm text-gray-500">
                      Category: {blog.category}
                    </p>
                  </CardContent>

                  <CardFooter className="p-0 mt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Author: {blog.author.name}
                    </p>

                    <div className="flex space-x-2">
                      {isAuthor && (
                        <>
                          {isEditing ? (
                            <Button
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                              onClick={() => handleSaveClick(blog._id)}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                              onClick={() => handleEditClick(blog)}
                            >
                              Edit
                            </Button>
                          )}

                          <Button
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                            onClick={() => handleDeleteSaveClick(blog._id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </CardFooter>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Custom CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          aside {
            margin-bottom: 1rem;
          }
          .flex-col {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Blog;
