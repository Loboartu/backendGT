// src/routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/categorias', verifyToken, categoriaController.criarCategoria); // PROTEGIDO
router.get('/categorias', categoriaController.listarCategorias); // Não protegido
// router.get('/categorias/:id', categoriaController.obterCategoriaPorId); // Não protegido
// router.put('/categorias/:id', verifyToken, categoriaController.atualizarCategoria); // PROTEGIDO
// router.delete('/categorias/:id', verifyToken, categoriaController.deletarCategoria); // PROTEGIDO

module.exports = router;
