const express = require("express");
const blogRouter = express.Router();
const { auth } = require("../middleware/auth");
const { BlogModel } = require("../models/Blog.model");

// Create Blog (Author only)
blogRouter.post("/", auth, async (req, res) => {
  if (req.user.role !== "author")
    return res.status(403).json({ message: "Only authors can create blogs" });

  const blog = new BlogModel({ ...req.body, authorID: req.user._id });
  await blog.save();
  res.status(201).json(blog);
});

// Get All Blogs (search, filter)
blogRouter.get("/", async (req, res) => {
  const { title, category } = req.query;
  let filter = {};

  if (title) filter.title = { $regex: title, $options: "i" };
  if (category) filter.category = category;

  const blogs = await BlogModel.find(filter).populate("authorID", "name");
  res.json(blogs);
});

// Get One Blog
blogRouter.get("/:id", async (req, res) => {
  const blog = await BlogModel.findById(req.params.id).populate(
    "authorID",
    "name"
  );
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
});

// Update Blog (only if author owns it)
blogRouter.put("/:id", auth, async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  if (
    req.user.role !== "author" ||
    blog.authorID.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ message: "Not allowed to update this blog" });
  }

  const { title, content, category } = req.body;
  if (title) blog.title = title;
  if (content) blog.content = content;
  if (category) blog.category = category;

  await blog.save();
  res.json(blog);
});

// Delete Blog (only if author owns it)
blogRouter.delete("/:id", auth, async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  if (
    req.user.role !== "author" ||
    blog.authorID.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ message: "Not allowed to delete this blog" });
  }

  await blog.remove();
  res.json({ message: "Blog deleted" });
});

module.exports = { blogRouter };
