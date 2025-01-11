const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.Host,
    port: process.env.MailPort,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.User,
      pass: process.env.Pass,
    },
  });

module.exports = transporter