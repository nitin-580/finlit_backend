const { Router } = require("express");
const cookieParser = require("cookie-parser");

// Middlewares
const { authMiddleware } = require("../middlewares/auth.middleware");
const { adminMiddleware } = require("../middlewares/admin.middleware");

// Controllers
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost
} = require("../controllers/admin.post.controller");

const {
  getAllComments,
  deleteComment
} = require("../controllers/admin.comment.controller");

const {
  getAllUsers,
  updateUserRole,
  deleteUser
} = require("../controllers/admin.user.controller");

const adminRouter = Router();

// Attach cookie parser so tokens are readable
adminRouter.use(cookieParser());

// Protect ALL admin routes
adminRouter.use(authMiddleware, adminMiddleware);

/* --------------------------------------
   POST MANAGEMENT (CRUD)
-----------------------------------------*/

// Create a new blog post
adminRouter.post("/posts", createPost);

// Get all posts
adminRouter.get("/posts", getAllPosts);

// Update a specific post
adminRouter.put("/posts/:id", updatePost);

// Delete a specific post
adminRouter.delete("/posts/:id", deletePost);


/* --------------------------------------
   COMMENT MANAGEMENT
-----------------------------------------*/

// Get all comments across all posts
adminRouter.get("/comments", getAllComments);

// Delete specific comment
adminRouter.delete("/comments/:id", deleteComment);


/* --------------------------------------
   USER MANAGEMENT
-----------------------------------------*/

// Get all users
adminRouter.get("/users", getAllUsers);

// Update user role (reader → author, author → admin)
adminRouter.put("/users/:id/role", updateUserRole);

// Delete a user
adminRouter.delete("/users/:id", deleteUser);


module.exports = adminRouter;