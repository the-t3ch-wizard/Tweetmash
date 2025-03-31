import { sendEmail } from "../../lib/emailSender";
import { logger } from "../../lib/logger";
import { successResponse } from "../../lib/utils";
import { Req, Res } from "../../types/types";

const mail = async (req: Req, res: Res) => {
  logger.info("Mail contact us details");

  const { name, email, subject, message } = req.body;

  await sendEmail({
    subject: "Tweetmash (Contact form) : " + String(subject).charAt(0).toUpperCase() + String(subject).slice(1),
    message: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `
      <h3>Tweetmash: Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  });

  res.status(200).json(successResponse(200, "Contact details sent successfully", null));
};

export const contact = {
  mail,
};
