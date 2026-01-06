function welcomeEmailTemplate({
    name = "there",
    appName = "Debroi",
    supportEmail = "support@Debroi.com"
  }) {
    return `
      <div style="
        font-family: Arial, sans-serif;
        background-color: #f9fafb;
        padding: 20px;
      ">
        <div style="
          max-width: 520px;
          margin: auto;
          background: #ffffff;
          padding: 28px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        ">
          <h2 style="color: #111827; margin-bottom: 12px;">
            Welcome to ${appName}, ${name} 👋
          </h2>
  
          <p style="color: #374151; font-size: 14px; line-height: 1.6;">
            We’re excited to have you on board! Your account has been successfully
            created, and you can now explore everything ${appName} has to offer.
          </p>
  
          <p style="color: #374151; font-size: 14px; line-height: 1.6;">
            If you have any questions or need assistance, feel free to reach out to us at
            <a href="mailto:${supportEmail}" style="color: #2563eb;">
              ${supportEmail}
            </a>.
          </p>
  
          <div style="
            margin: 24px 0;
            padding: 16px;
            background-color: #f3f4f6;
            border-radius: 6px;
            font-size: 14px;
            color: #374151;
          ">
            🔐 <strong>Security Tip:</strong> Never share your OTP or password with anyone.
          </div>
  
          <p style="color: #6b7280; font-size: 13px;">
            We’re glad you’re here and look forward to helping you get the most out of
            ${appName}.
          </p>
  
          <hr style="
            margin: 28px 0;
            border: none;
            border-top: 1px solid #e5e7eb;
          " />
  
          <p style="color: #6b7280; font-size: 12px;">
            — The ${appName} Team
          </p>
        </div>
      </div>
    `;
  }
  
  module.exports = { welcomeEmailTemplate };