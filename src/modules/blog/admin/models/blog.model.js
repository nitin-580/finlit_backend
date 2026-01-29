const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String, required: true },

  coverImage: { type: String },

  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],

  pollId: { type: mongoose.Schema.Types.ObjectId, ref: "Poll" },

  likesCount: { type: Number, default: 0 },
  viewsCount: { type: Number, default: 0 },

  status: {
    type: String,
    enum: ["draft", "published", "scheduled"],
    default: "draft",
  },

  scheduledAt: { type: Date },

  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
  }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);