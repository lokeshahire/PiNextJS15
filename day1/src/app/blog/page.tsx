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

  // const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [user, setUser] = useState<any>(null); // will store { id, role }

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

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center my-4">Blogs</h1>

      <div className="w-1/3 mx-auto space-y-3">
        <Input
          className="w-full p-2 border"
          placeholder="Search by title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Select
          value={category}
          onValueChange={(val) => setCategory(val === "all" ? "" : val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="school">School</SelectItem>
            <SelectItem value="university">University</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>

        {user?.role === "author" && (
          <div className="text-center mb-4">
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 text-white px-4 py-2 rounded">
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
                    className="w-full border rounded p-2"
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
                    className="bg-blue-600 text-white"
                    onClick={handleAddBlog}
                  >
                    Submit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {blogs.map((blog: any) => {
          const isAuthor =
            user?.role === "author" && user?.id === blog.author._id;
          const isEditing = editingId === blog._id;
          const isDeleting = deletingId === blog._id;

          return (
            <Card key={blog._id} className="my-5 p-3">
              <CardHeader>
                {isEditing || isDeleting ? (
                  <input
                    name="title"
                    value={editedBlogs.title}
                    onChange={handleChange}
                    className="w-full border p-1"
                  />
                ) : (
                  <CardTitle>{blog.title}</CardTitle>
                )}

                {isEditing || isDeleting ? (
                  <textarea
                    name="content"
                    value={editedBlogs.content}
                    onChange={handleChange}
                    className="w-full border p-1 mt-2"
                  />
                ) : (
                  <CardDescription>{blog.content}</CardDescription>
                )}
              </CardHeader>

              <CardContent>
                {isEditing || isDeleting ? (
                  <select
                    name="category"
                    value={editedBlogs.category}
                    onChange={handleChange}
                    className="w-full border p-1"
                  >
                    <option value="school">School</option>
                    <option value="university">University</option>
                    <option value="general">General</option>
                  </select>
                ) : (
                  <p>Category: {blog.category}</p>
                )}
              </CardContent>

              <CardFooter className="flex justify-between items-center">
                <p>Author: {blog.author.name}</p>

                {isAuthor && (
                  <div className="flex space-x-2">
                    {isEditing ? (
                      <Button
                        className="bg-green-600 text-white px-3 py-1 rounded"
                        onClick={() => handleSaveClick(blog._id)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                        onClick={() => handleEditClick(blog)}
                      >
                        Edit
                      </Button>
                    )}

                    <Button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteSaveClick(blog._id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
