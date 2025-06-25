const router = require('express').Router()
const productController = require("../controllers/productController")
const authMiddleware = require('../middleware/authMiddleware.js')

// route.use(authMiddleware)

router.get("/", productController.listarProdutos)
router.get("/:id", productController.buscarProduto)
router.post("/", productController.criarProduto)
router.put("/:id", productController.atualizarProduto)
router.delete("/:id", productController.deletarProduto)

module.exports = router
