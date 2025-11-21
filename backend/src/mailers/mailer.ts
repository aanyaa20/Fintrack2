import { Env } from "../config/env.config";
import nodemailer from "nodemailer";

type Params = {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  from?: string;
};

// Create transporter with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: Env.EMAIL_USER,
    pass: Env.EMAIL_PASS,
  },
});

const mailer_sender = `Fintrack <${Env.EMAIL_USER}>`;

export const sendEmail = async ({
  to,
  from = mailer_sender,
  subject,
  text,
  html,
}: Params) => {
  const mailOptions = {
    from,
    to: Array.isArray(to) ? to.join(', ') : to,
    subject,
    text,
    html,
  };

  return await transporter.sendMail(mailOptions);
};