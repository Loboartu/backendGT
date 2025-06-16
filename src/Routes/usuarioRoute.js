// src/routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verifyToken = require('src/middleware/authMiddleware.js'); // Importa o middleware de autenticação

router.post('/usuarios', usuarioController.criarUsuario); // CRIAR USUÁRIO NÃO É PROTEGIDO (Para registro)
router.get('/usuarios/:id', usuarioController.obterUsuarioPorId); // GET não protegido por padrão

router.put('/usuarios/:id', verifyToken, usuarioController.atualizarUsuario); // PROTEGIDO
router.delete('/usuarios/:id', verifyToken, usuarioController.deletarUsuario); // PROTEGIDO

module.exports = router;