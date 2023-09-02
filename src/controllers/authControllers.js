const User = require('../models/User');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

exports.register = async (req, res) => {
  try {
    // Create a new user
    const newUser = new User(req.body);
    await newUser.save();

    // Send confirmation email
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'RUQTEC',
        link: 'https://ruqtec.com',
      },
    });

    const email = {
      body: {
        name: newUser.firstName,
        intro: 'Welcome to Ruqtec!', 
        // Add more email content as needed
      },
    };

    const emailTemplate = mailGenerator.generate(email);
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'info@ruqtec.com',
      to: newUser.email,
      subject: 'Welcome to Your Website',
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};