const router = require('express').Router()
const productController = require("../controllers/productController")
const authMiddleware = require('../middleware/authMiddleware.js')

router.use(authMiddleware)

router.get("/produtos", productController.listarProdutos)
router.get("/produtos/:id", productController.buscarProduto)
router.post("/produtos", productController.criarProduto)
router.put("/produtos/:id", productController.atualizarProduto)
router.delete("/produtos/:id", productController.deletarProduto)

module.exports = router
