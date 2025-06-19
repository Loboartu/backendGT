// ProdutoController.test.js
const { listarProdutos } = require('../src/controllers/ProdutoController')
const ProdutoService = require('../src/services/ProductService')

jest.mock('../src/services/ProductService')

describe('listarProdutos', () => {
  it('deve retornar 200 com a lista de produtos', async () => {
    const req = { query: { page: '1', limit: '10' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    ProdutoService.listarProdutosService.mockResolvedValue([
      { id: 1, nome: 'Camisa', preco: 99.9 }
    ])

    await listarProdutos(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, nome: 'Camisa', preco: 99.9 }
    ])
  })
})
