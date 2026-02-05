const Comment = require("../models/comment.model");

async function getAllComments(req, res) {
  try {
    const comments = await Comment.find()
      .populate("userId", "name email")
      .populate("postId", "title");

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteComment(req, res) {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllComments, deleteComment };