const Post = require("../../admin/models/blog.model");

async function createPost(req, res) {
  try {
    const post = await Post.create({
      ...req.body,
      author: req.user._id
    });

    res.json({ message: "Post created", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updatePost(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Post updated", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deletePost(req, res) {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost
};