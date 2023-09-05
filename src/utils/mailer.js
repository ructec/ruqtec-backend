const { sendRegistrationEmail } = require('../utils/mailer');

exports.registerForCourse = async (req, res) => {
  try {
    // Your course registration logic here
    const userData = req.body; // Assuming user data is sent in the request body

    // Send registration email
    await sendRegistrationEmail(userData.email, userData.name);

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};
