import nodemailer from "nodemailer"
import { env } from "../config/env";

interface EmailOptions {
  subject: string;
  message: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  // 1) Create transporter
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST as string,
    port: parseInt(env.EMAIL_PORT as string, 10),
    auth: {
      user: env.EMAIL_USER as string,
      pass: env.EMAIL_PASS as string
    }
  });

  // 2) Define email options
  const mailOptions = {
    from: `"Contact Form" <${env.EMAIL_USER}>`,
    to: env.EMAIL_USER,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  // 3) Send email
  await transporter.sendMail(mailOptions);
};
