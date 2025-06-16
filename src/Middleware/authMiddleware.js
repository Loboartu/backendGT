// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * @file Middleware para validação de token JWT.
 * @description Verifica a presença e a validade de um token JWT no cabeçalho 'Authorization'.
 * @aula O Papel do Middleware de Autenticação: É uma função que fica "no meio" da requisição. Antes de uma requisição chegar ao controller, este middleware a intercepta. Se o token for inválido ou ausente, ele rejeita a requisição imediatamente, evitando que ela chegue ao controller. Se o token for válido, ele permite que a requisição continue. Isso centraliza a lógica de segurança.
 */
function verifyToken(req, res, next) {
    // Obter o token do cabeçalho de autorização. Espera o formato "Bearer SEU_TOKEN_AQUI"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Pega a segunda parte da string (o token em si)

    if (!token) {
        // Se o token não estiver presente, rejeita a requisição
        return res.status(400).json({ error: 'Token de autenticação não fornecido.' });
    }

    try {
        // Verifica a validade do token usando a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Opcional: Se necessário, você pode anexar informações do usuário decodificado à requisição
        // (ex: req.userId = decoded.id; req.userEmail = decoded.email;)
        // Isso permite que o controller saiba qual usuário está fazendo a requisição.
        // Se o token for válido, passa o controle para o próximo middleware ou para a função do controller
        next();
    } catch (error) {
        console.error("Erro na validação do token:", error);
        // Erro ao verificar o token (pode ser expirado, inválido, malformado, etc.)
        return res.status(400).json({ error: 'Token de autenticação inválido ou expirado.' });
    }
}

module.exports = verifyToken;