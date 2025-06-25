const {buscarProdutoPorId,listarProdutos,criarProduto,atualizarProduto,deletarProduto} = require("../repositories/productRepository")

async function listarProdutosService(page = 1, limit = 5) {
  return await listarProdutos(page, limit)
}

async function buscarProdutoService(id) {
  const produto = await buscarProdutoPorId(id)
  if (!produto) {
    throw new Error("Produto não encontrado")
  }
  return produto
}

async function criarProdutoService(data) {
  return await criarProduto(data)
}

async function atualizarProdutoService(id, data) {
  return await atualizarProduto(id, data)
}

async function deletarProdutoService(id) {
  return await deletarProduto(id)
}

module.exports = {
  listarProdutosService,
  buscarProdutoService,
  criarProdutoService,
  atualizarProdutoService,
  deletarProdutoService
}
