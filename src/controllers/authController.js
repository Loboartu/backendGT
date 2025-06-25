const usuarioService = require('../services/usuarioService');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/** @file  @description */

async function generateToken(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    try {
        const usuarioValido = await usuarioService.validarCredenciais(email, password);

        if (!usuarioValido) {

            return res.status(400).json({ error: 'Credenciais inválidas.' });
        }

        const token = jwt.sign(
            { id: usuarioValido.id, email: usuarioValido.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        console.error("Erro ao gerar token:", error);
        res.status(500).json({ error: 'Erro interno do servidor ao gerar token.', details: error.message });
    }
}

module.exports = {
    generateToken
};
