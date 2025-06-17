const prisma = require("../config/prisma")

// buscar produto por id
function buscarProdutoPorId(product_id) {
  return prisma.product.findUnique({
    where: { id: Number(product_id) },
    include: {
      images: true
    }
  })
}

// Listar todos os produtos
function listarProdutos(page = 1, limit = 10) {
  return prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
    include: {
      images: true
    }
  })
}

// Criar um  produto 
function criarProduto(data) {
  return prisma.product.create({
    data
  })
}

// Atualizar produto por ID
function atualizarProduto(product_id, data) {
  return prisma.product.update({
    where: { id: Number(product_id) },
    data
  })
}

// Deletar produto
function deletarProduto(product_id) {
  return prisma.product.delete({
    where: { id: Number(product_id) }
  })
}

module.exports = {
  buscarProdutoPorId,
  listarProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto
}
