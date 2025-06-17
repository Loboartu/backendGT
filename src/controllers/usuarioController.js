// src/controllers/usuarioController.js
const usuarioService = require('../services/usuarioService'); // Importa o serviço de usuário

/**
 * @file Controller para manipulação de usuários.
 * @description Lida com as requisições HTTP para a entidade Usuário, delegando a lógica para o serviço.
 * @aula O Papel do Controller: É o ponto de entrada da requisição HTTP. Ele recebe os dados da requisição (`req.body`, `req.params`), faz validações básicas (se os dados existem), chama a função apropriada no Serviço para fazer a "mágica" (a lógica de negócio), e por fim, envia a resposta HTTP (`res.status`, `res.json`).
 */
async function criarUsuario(req, res) {
    const { firstname, surname, email, password } = req.body;

    // Validação inicial (verificar se os campos obrigatórios foram enviados na requisição)
    if (!firstname || !surname || !email || !password) {
        console.warn('Tentativa de criar usuário com parâmetros faltando ou inválidos:', req.body);
        return res.status(400).json({
            error: 'Parâmetros necessários faltando ou inválidos.',
            required: ['firstname', 'surname', 'email', 'password']
        });
    }

    try {
        // Chama o serviço para executar a lógica de criação (hash de senha, salvar no banco)
        const novoUsuario = await usuarioService.criarUsuario(firstname, surname, email, password);
        // Filtra a senha antes de enviar a resposta por segurança
        const { password: _, ...usuarioSemSenha } = novoUsuario;
        res.status(201).json({ // 201 Created: sucesso na criação de recurso
            message: 'Usuário criado com sucesso!',
            usuario: usuarioSemSenha
        });
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        // Mapeia erros específicos do serviço para status HTTP apropriados
        if (error.message === 'Usuário com este email já existe.') {
            return res.status(409).json({ error: error.message }); // 409 Conflict: recurso já existe
        }
        res.status(500).json({ // 500 Internal Server Error: erro inesperado
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
    const { id } = req.params; // Pega o ID da URL

    try {
        const usuario = await usuarioService.obterUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' }); // 404 Not Found
        }
        const { password: _, ...usuarioSemSenha } = usuario;
        res.status(200).json(usuarioSemSenha); // 200 OK: sucesso
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

    // Validação mínima: Ao menos um campo deve ser fornecido para atualizar
    if (!firstname && !surname && !email && !password) {
        return res.status(400).json({
            error: 'Nenhum dado fornecido para atualização.',
            required: ['firstname', 'surname', 'email', 'password']
        });
    }

    try {
        // Chama o serviço para executar a lógica de atualização
        const usuarioAtualizado = await usuarioService.atualizarUsuario(id, { firstname, surname, email, password });
        const { password: _, ...usuarioSemSenha } = usuarioAtualizado;
        res.status(200).json({ // 200 OK: sucesso na atualização
            message: 'Usuário atualizado com sucesso!',
            usuario: usuarioSemSenha
        });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        if (error.message === 'Este email já está sendo usado por outro usuário.') {
            return res.status(409).json({ error: error.message });
        }
        // Aqui, caso o serviço não encontre o usuário, ele lançaria um erro que pode ser mapeado para 404
        // Ou, se o serviço já tratasse e lançasse um erro específico. Por simplicidade, assumimos 500 para outros.
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar usuário.', details: error.message });
    }
}

/**
 * Deleta um usuário pelo ID.
 * @function deletarUsuario
 */
async function deletarUsuario(req, res) {
    const { id } = req.params;

    try {
        await usuarioService.deletarUsuario(id);
        res.status(204).send(); // 204 No Content: sucesso sem retorno de corpo
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        // Mapeia erros específicos do serviço
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
