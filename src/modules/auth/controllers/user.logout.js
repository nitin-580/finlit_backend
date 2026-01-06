const User = require("../model/user.model");

async function logoutUser(req, res) {
    const userId = req.user.id;

    await User.findByIdAndUpdate(userId, { refreshToken: null });

    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({ message: "Logged out" });
}
module.exports ={
    logoutUser
}