const prisma = require("../config/prisma")

function buscarProdutoPorId(product_id) {
  return prisma.product.findUnique({
    where: { id: Number(product_id) },
    include: {
      images: true
    }
  })
}

function listarProdutos(page = 1, limit = 10) {
  return prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
    include: {
      images: true
    }
  })
}

function criarProduto(data) {
  return prisma.product.create({
    data
  })
}

function atualizarProduto(product_id, data) {
  return prisma.product.update({
    where: { id: Number(product_id) },
    data
  })
}

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
