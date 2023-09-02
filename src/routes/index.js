const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authControllers');

// Registration route
router.post('/register', register);

module.exports = router;
