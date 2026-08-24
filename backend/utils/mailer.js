import { Resend } from "resend";

let resend;

const getResend = () => {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
};

export const sendPasswordResetEmail = async ({ to, firstName, resetUrl }) => {
  try {
    await getResend().emails.send({
      from: process.env.EMAIL_FROM || "247Market <onboarding@resend.dev>",
      to,
      subject: "Reset your 247Market password",
      html: `
        <div style="font-family: sans-serif; color: #0a1128;">
          <h2>Hi ${firstName},</h2>
          <p>We got a request to reset your 247Market password. This link expires in 1 hour.</p>
          <p><a href="${resetUrl}" style="background:#0d2140; color:white; padding:12px 22px; border-radius:6px; text-decoration:none; display:inline-block;">Reset Password</a></p>
          <p style="color:#5a5a5a; font-size: 13px;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });
  } catch (error) {
    console.log(error, "Error sending password reset email");
  }
};

export const sendWelcomeEmail = async ({ to, firstName }) => {
  try {
    await getResend().emails.send({
      from: process.env.EMAIL_FROM || "247Market <onboarding@resend.dev>",
      to,
      subject: "Welcome to 247Market!",
      html: `
        <div style="font-family: sans-serif; color: #0a1128;">
          <h2>Welcome, ${firstName}!</h2>
          <p>Your 247Market account is ready. Start browsing or post your first ad today.</p>
          <p style="color:#5a5a5a; font-size: 13px;">If you didn't create this account, you can safely ignore this email.</p>
        </div>
      `,
    });
  } catch (error) {
    console.log(error, "Error sending welcome email");
  }
};
