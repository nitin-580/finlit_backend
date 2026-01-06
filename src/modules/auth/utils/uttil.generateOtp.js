const crypto = require("crypto");

async function generateOtp(email) {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    return { otp, otpHash };
  } catch (error) {
    throw new Error("OTP generation failed");
  }
}

module.exports = { generateOtp };
