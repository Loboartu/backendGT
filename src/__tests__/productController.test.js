// ProdutoController.test.js
const productController = require("../controllers/productController.js");
const prisma = require("../config/prisma.js");

describe("Controller - criar produto", () => {
  let produtoCriadoId;

  afterAll(async () => {
    
    if (produtoCriadoId) {
      await prisma.product.delete({
        where: { id: produtoCriadoId }
      });
    }

    await prisma.$disconnect();
  });

  it("deve criar um produto com sucesso", async () => {
    const req = {
      body: {
        name: "Produto Teste",
        description: "Descrição teste",
        price: 100,
        price_with_discount: 90,
        stock: 10,
        category_id: 1 
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await productController.criarProduto(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Produto criado com sucesso"
    });

    
    const produto = await prisma.product.findFirst({
      where: { name: "Produto Teste" }
    });

    expect(produto).not.toBeNull();
    expect(produto.name).toBe("Produto Teste");

    
    produtoCriadoId = produto.id;
  });
});
