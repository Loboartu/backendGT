// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

/**
 * @file 
 * @description 
 */

router.post('/user/token', authController.generateToken);

module.exports = router;