// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verifyToken = require('../middleware/authMiddleware'); // Middleware para proteção

/**
 * @file Rotas para usuários.
 * @description Define os endpoints da API para a entidade Usuário e os associa aos controllers.
 * @aula O Papel das Rotas: São como um "mapa" da sua API. Elas definem quais URLs (caminhos) e quais métodos HTTP (GET, POST, PUT, DELETE) sua API responde, e qual função do controller deve ser executada para cada combinação.
 */

// Rota para criar um novo usuário (POST)
// Este endpoint NÃO é protegido, pois é o ponto de registro de novos usuários.
router.post('/usuarios', usuarioController.criarUsuario);

// Rota para obter informações de um usuário pelo ID (GET)
// GETs geralmente não são protegidos (mas podem ser, dependendo da regra de negócio).
router.get('/usuarios/:id', usuarioController.obterUsuarioPorId);

// Rota para atualizar um usuário pelo ID (PUT)
// PROTEGIDA: Requer um token JWT válido para ser acessada.
router.put('/usuarios/:id', verifyToken, usuarioController.atualizarUsuario);

// Rota para deletar um usuário pelo ID (DELETE)
// PROTEGIDA: Requer um token JWT válido para ser acessada.
router.delete('/usuarios/:id', verifyToken, usuarioController.deletarUsuario);

module.exports = router;