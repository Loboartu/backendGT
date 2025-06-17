const categoriaService = require('../services/categoriaService');

module.exports = {
  async criarCategoria(req, res) {
    try {
      const novaCategoria = await categoriaService.criar(req.body);
      return res.status(201).json(novaCategoria);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async listarCategorias(req, res) {
    try {
      const categorias = await categoriaService.listar();
      return res.status(200).json(categorias);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  },
};
