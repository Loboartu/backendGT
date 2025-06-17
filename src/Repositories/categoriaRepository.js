const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async criarCategoria(dados) {
    return await prisma.categoria.create({
      data: {
        name: dados.name,
        slug: dados.slug,
        use_in_menu: dados.use_in_menu ?? false,
      },
    });
  },

  async buscarTodas() {
    return await prisma.categoria.findMany();
  },
};
