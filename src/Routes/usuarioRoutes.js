const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verifyToken = require('../middleware/authMiddleware'); 

/**
 * @file 
 * @description 
 */

router.post('/usuarios', usuarioController.criarUsuario);

router.get('/usuarios/:id', usuarioController.obterUsuarioPorId);

router.put('/usuarios/:id', verifyToken, usuarioController.atualizarUsuario);

router.delete('/usuarios/:id', verifyToken, usuarioController.deletarUsuario);

module.exports = router;