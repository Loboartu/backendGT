const {
  listarProdutosService,
  buscarProdutoService,
  criarProdutoService,
  atualizarProdutoService,
  deletarProdutoService
} = require("../services/ProductService")


async function listarProdutos(req, res) {
  const { page, limit } = req.query
  const pageNumber = parseInt(page) || 1
  const limitNumber = parseInt(limit) || 10

  try {
    const produtos = await listarProdutosService(pageNumber, limitNumber)
    res.status(200).json(produtos)
  } catch (error) {
    console.error("Erro ao listar produtos:", error)
    res.status(500).json({ erro: "Erro ao listar produtos", details: error.message })
  }
}

async function buscarProduto(req, res) {
  const { id } = req.params
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" })
  }

  try {
    const produto = await buscarProdutoService(id)
    res.status(200).json(produto)
  } catch (error) {
    console.error("Erro ao buscar produto:", error)
    res.status(404).json({ erro: "Produto não encontrado", details: error.message })
  }
}

async function criarProduto(req, res) {
  const data = req.body

  try {
    const novoProduto = await criarProdutoService(data)
    res.status(201).json(novoProduto)
  } catch (error) {
    console.error("Erro ao criar produto:", error)
    res.status(500).json({ erro: "Erro ao criar produto", details: error.message })
  }
}

async function atualizarProduto(req, res) {
  const { id } = req.params
  const data = req.body

  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" })
  }

  try {
    const produtoAtualizado = await atualizarProdutoService(id, data)
    res.status(200).json(produtoAtualizado)
  } catch (error) {
    console.error("Erro ao atualizar produto:", error)
    res.status(500).json({ erro: "Erro ao atualizar produto", details: error.message })
  }
}

async function deletarProduto(req, res) {
  const { id } = req.params

  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" })
  }

  try {
    await deletarProdutoService(id)
    res.status(204).send()
  } catch (error) {
    console.error("Erro ao deletar produto:", error)
    res.status(500).json({ erro: "Erro ao deletar produto", details: error.message })
  }
}

module.exports = {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto
}
