function otpEmailTemplate({
    otp,
    purpose = "Verification",
    validityMinutes = 5,
    appName = "Debroi"
  }) {
    return `
      <div style="
        font-family: Arial, sans-serif;
        background-color: #f9fafb;
        padding: 20px;
      ">
        <div style="
          max-width: 480px;
          margin: auto;
          background: #ffffff;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        ">
          <h2 style="color: #111827; margin-bottom: 8px;">
            ${purpose} OTP
          </h2>
  
          <p style="color: #374151; font-size: 14px;">
            Use the following One-Time Password (OTP) to complete your
            <strong>${purpose.toLowerCase()}</strong>.
          </p>
  
          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 6px;
            text-align: center;
            margin: 24px 0;
            color: #111827;
          ">
            ${otp}
          </div>
  
          <p style="color: #374151; font-size: 14px;">
            This OTP is valid for <strong>${validityMinutes} minutes</strong>.
            Please do not share it with anyone.
          </p>
  
          <p style="color: #6b7280; font-size: 12px; margin-top: 24px;">
            If you did not request this, you can safely ignore this email.
          </p>
  
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
  
          <p style="color: #6b7280; font-size: 12px;">
            — ${appName} Security Team
          </p>
        </div>
      </div>
    `;
  }
  
  module.exports = { otpEmailTemplate };