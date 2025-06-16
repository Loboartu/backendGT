// src/routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verifyToken = require('src/middleware/authMiddleware.js'); // Importa o middleware de autenticação

router.post('/usuario', usuarioController.criarUsuario); // CRIAR USUÁRIO NÃO É PROTEGIDO (Para registro)
router.get('/usuario/:id', usuarioController.obterUsuarioPorId); // GET não protegido por padrão

router.put('/usuario/:id', verifyToken, usuarioController.atualizarUsuario); // PROTEGIDO
router.delete('/usuario/:id', verifyToken, usuarioController.deletarUsuario); // PROTEGIDO

module.exports = router;