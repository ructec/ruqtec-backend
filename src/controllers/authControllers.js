const {User} = require('../db');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

exports.register = async (req, res) => {
  try {
    // Create a new user
    const newUser = await User.create({...req.body})

    // Send confirmation email
    const mailGenerator = new Mailgen({
      theme: 'green',
      product: {
        name: 'RUQTEC',
        link: 'https://ruqtec.com',
        logo: 'https://ruqtec.com/Images/logo.png'
      },
    });

    const email = {
      body: {
        name: newUser.firstName,
        intro: 'Welcome to Ruqtec!', 
        action: {
            text: 'Kindly be on look out as we will email you in the next 48hrs on further instructions. Only via this email address.'
        },
        outro: "If you have any questions please contact us via this email or +2348061718441"
        
      },
    };

    const emailTemplate = mailGenerator.generate(email);
    const transporter = nodemailer.createTransport({
      host: "ruqtec.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'dev@ruqtec.com',
      to: newUser.email,
      subject: `Application for${newUser.course} received`,
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
