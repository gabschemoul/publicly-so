import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Godaddy",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const mailOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL,
};
