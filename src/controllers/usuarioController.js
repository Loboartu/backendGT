const usuarioService = require('../services/usuarioService');

/**
 * @file 
 * @description 
 * @aula 
 */
async function criarUsuario(req, res) {
    const { firstname, surname, email, password } = req.body;

    if (!firstname || !surname || !email || !password) {
        console.warn('Tentativa de criar usuário com parâmetros faltando ou inválidos:', req.body);
        return res.status(400).json({
            error: 'Parâmetros necessários faltando ou inválidos.',
            required: ['firstname', 'surname', 'email', 'password']
        });
    }

    try {
        const novoUsuario = await usuarioService.criarUsuario(firstname, surname, email, password);
        const { password: _, ...usuarioSemSenha } = novoUsuario;
        res.status(201).json({ 
            message: 'Usuário criado com sucesso!',
            usuario: usuarioSemSenha
        });
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        if (error.message === 'Usuário com este email já existe.') {
            return res.status(409).json({ error: error.message }); 
        }
        res.status(500).json({ 
            error: 'Erro interno do servidor ao criar usuário.',
            details: error.message
        });
    }
}
/**
 * Obtém informações de um usuário pelo ID.
 * @function obterUsuarioPorId
 */
async function obterUsuarioPorId(req, res) {
    const { id } = req.params;

    try {
        const usuario = await usuarioService.obterUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' }); 
        }
        const { password: _, ...usuarioSemSenha } = usuario;
        res.status(200).json(usuarioSemSenha); 
    } catch (error) {
        console.error("Erro ao obter usuário por ID:", error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar usuário.', details: error.message });
    }
}

/**
 * Atualiza as informações de um usuário pelo ID.
 * @function atualizarUsuario
 */
async function atualizarUsuario(req, res) {
    const { id } = req.params;
    const { firstname, surname, email, password } = req.body;

    if (!firstname && !surname && !email && !password) {
        return res.status(400).json({
            error: 'Nenhum dado fornecido para atualização.',
            required: ['firstname', 'surname', 'email', 'password']
        });
    }

    try {
        const usuarioAtualizado = await usuarioService.atualizarUsuario(id, { firstname, surname, email, password });
        const { password: _, ...usuarioSemSenha } = usuarioAtualizado;
        res.status(200).json({ 
            message: 'Usuário atualizado com sucesso!',
            usuario: usuarioSemSenha
        });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        if (error.message === 'Este email já está sendo usado por outro usuário.') {
            return res.status(409).json({ error: error.message });
        }
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar usuário.', details: error.message });
    }
}

/**
 * 
 * @function deletarUsuario
 */
async function deletarUsuario(req, res) {
    const { id } = req.params;

    try {
        await usuarioService.deletarUsuario(id);
        res.status(204).send(); 
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        if (error.message === 'Usuário não encontrado para exclusão.') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Erro interno do servidor ao deletar usuário.', details: error.message });
    }
}

module.exports = {
    criarUsuario,
    obterUsuarioPorId,
    atualizarUsuario,
    deletarUsuario
};
