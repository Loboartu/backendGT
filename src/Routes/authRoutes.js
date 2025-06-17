// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

/**
 * @file Rotas para autenticação (geração de token JWT).
 * @description Define o endpoint para login de usuários e geração de token.
 */

// Rota para gerar um token JWT (login)
// Este é o endpoint de login e NÃO é protegido por token, claro.
router.post('/user/token', authController.generateToken);

module.exports = router;