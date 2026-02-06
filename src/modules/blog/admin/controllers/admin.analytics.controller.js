const Post = require("../../blogs/model/post.model");
const Comment = require("../../blogs/model/comment.model");
const User = require("../../auth/model/user.model");
const Poll = require("../../blogs/model/poll.model");
const Category = require("../../blogs/model/category.model");

// -------------------------------
// Admin Analytics Controller
// -------------------------------

/**
 * Get overall blog analytics
 */
async function getDashboardStats(req, res) {
  try {
    const totalPosts = await Post.countDocuments();
    const totalComments = await Comment.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalViews = await Post.aggregate([
      { $group: { _id: null, views: { $sum: "$viewsCount" } } }
    ]);

    return res.json({
      totalPosts,
      totalComments,
      totalUsers,
      totalViews: totalViews[0]?.views || 0
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


/**
 * Get top 10 most viewed posts
 */
async function getTopViewedPosts(req, res) {
  try {
    const posts = await Post.find()
      .sort({ viewsCount: -1 })
      .limit(10)
      .select("title viewsCount createdAt");

    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


/**
 * Get top 10 most liked posts
 */
async function getTopLikedPosts(req, res) {
  try {
    const posts = await Post.find()
      .sort({ likesCount: -1 })
      .limit(10)
      .select("title likesCount createdAt");

    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


/**
 * Get analytics grouped by category
 */
async function getCategoryStats(req, res) {
  try {
    const data = await Post.aggregate([
      { $unwind: "$categories" },
      { $group: { _id: "$categories", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: "$category" },
      {
        $project: {
          _id: 0,
          category: "$category.name",
          count: 1
        }
      }
    ]);

    return res.json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


/**
 * Daily new posts for last 7 days
 */
async function getWeeklyPosts(req, res) {
  try {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const data = await Post.aggregate([
      { $match: { createdAt: { $gte: last7Days } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return res.json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


/**
 * Poll participation statistics
 */
async function getPollStats(req, res) {
  try {
    const polls = await Poll.find().select("question options voters createdAt");

    return res.json(polls);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


module.exports = {
  getDashboardStats,
  getTopViewedPosts,
  getTopLikedPosts,
  getCategoryStats,
  getWeeklyPosts,
  getPollStats
};