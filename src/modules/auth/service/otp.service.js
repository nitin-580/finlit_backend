const { generateOtp } = require('../utils/uttil.generateOtp');
const { redis } = require('../../../config/redis.config');
const { sendEmail } = require('./email.service');
const { otpEmailTemplate } = require('../template/otpEmail.template');

async function sendOtp({ email, context }) {
    const { otp, otpHash } = await generateOtp(email);

    const key = `otp:${context}:${email}`;
  
    await redis.hset(key, 'hash', otpHash, 'attempts', 0);
    await redis.expire(key, 300);

    const contextConfig = {
        login: {
          subject: 'Login OTP',
          purpose: 'Login'
        },
        forgot: {
          subject: 'Password Reset OTP',
          purpose: 'Password Reset'
        },
        signup: {
          subject: 'Verify Your Email',
          purpose: 'Email Verification'
        }
      };


      const { subject, purpose } = contextConfig[context];

    const html = otpEmailTemplate({
        otp,
        purpose,
        validityMinutes: 5,
        appName: 'Debroi'
      });


    sendEmail({
        to: email,
        subject,
        html
    }).catch(console.error);
    console.log(`DEBUG OTP (${context}) for ${email}:`, otp);
}
module.exports ={
    sendOtp
}