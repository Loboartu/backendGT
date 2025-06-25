// src/routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/categorias', verifyToken, categoriaController.criarCategoria); 
router.get('/categorias', categoriaController.listarCategorias); 


module.exports = router;
