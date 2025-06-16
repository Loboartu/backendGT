// src/controllers/authController.js
const usuarioService = require('../services/usuarioService'); // Usa o serviço de usuário
const jwt = require('jsonwebtoken'); // Importa a biblioteca JWT
require('dotenv').config(); // Garante que JWT_SECRET seja carregado

/**
 * @file Controller para autenticação de usuários (geração de token JWT).
 * @description Lida com o endpoint de login, valida credenciais e gera o token de acesso.
 */
async function generateToken(req, res) {
    const { email, password } = req.body;

    // Validação inicial: verifica se email e senha foram fornecidos na requisição
    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    try {
        // Chama o serviço de usuário para validar as credenciais
        const usuarioValido = await usuarioService.validarCredenciais(email, password);

        if (!usuarioValido) {
            // Se as credenciais forem inválidas, retorna um erro genérico por segurança
            return res.status(400).json({ error: 'Credenciais inválidas.' });
        }

        // Gera o token JWT
        // O payload (primeiro argumento) contém informações que identificam o usuário.
        // A chave secreta (process.env.JWT_SECRET) é usada para assinar o token.
        // 'expiresIn' define por quanto tempo o token será válido (aqui, 1 hora).
        const token = jwt.sign(
            { id: usuarioValido.id, email: usuarioValido.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token }); // 200 OK: Retorna o token JWT
    } catch (error) {
        console.error("Erro ao gerar token:", error);
        res.status(500).json({ error: 'Erro interno do servidor ao gerar token.', details: error.message });
    }
}

module.exports = {
    generateToken
};
