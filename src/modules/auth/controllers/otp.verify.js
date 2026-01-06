const { redis } = require('../../../config/redis.config');
const crypto = require('crypto');

async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required"
      });
    }

    const key = `otp:${email}`;

    const otpData = await redis.hgetall(key);

    if (!otpData || Object.keys(otpData).length === 0) {
      return res.status(400).json({
        message: "OTP has expired or is invalid"
      });
    }

    const attempts = Number(otpData.attempts || 0);
    const storedHash = otpData.otpHash;

    if (attempts >= 5) {
      await redis.del(key);
      return res.status(429).json({
        message: "Too many attempts. Please request a new OTP."
      });
    }

    const incomingOtpHash = crypto
      .createHash('sha256')
      .update(otp)
      .digest('hex');

    if (incomingOtpHash !== storedHash) {
      await redis.hincrby(key, 'attempts', 1);
      return res.status(400).json({
        message: "Invalid OTP. Please try again."
      });
    }
    console.log({
        receivedOtp: otp,
        storedHash,
        incomingOtpHash
      });
    await redis.del(key);

    return res.status(200).json({
      message: "OTP verified successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
}

module.exports = { verifyOtp };