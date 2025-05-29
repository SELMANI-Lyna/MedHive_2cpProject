// config/emailConfig.js
const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

module.exports = { createTransporter };