const categoriaRepository = require('../repositories/categoriaRepository');

module.exports = {
  async criar(dados) {
    if (!dados.name || !dados.slug) {
      throw new Error('Campos obrigatórios: name e slug.');
    }

    return await categoriaRepository.criarCategoria(dados);
  },

  async listar() {
    return await categoriaRepository.buscarTodas();
  },
};
