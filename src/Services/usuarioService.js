// src/services/usuarioService.js
const usuarioRepository = require('../repositories/usuarioRepository');
const bcrypt = require('bcryptjs');

/**
 * 
 * @class UsuarioService
 */
class UsuarioService {
    async criarUsuario(firstname, surname, email, password) {
        const existingUser = await usuarioRepository.findByEmail(email);
        if (existingUser) { throw new Error('Usuário com este email já existe.'); }

        const hashedPassword = await bcrypt.hash(password, 10);
        return usuarioRepository.create({ firstname, surname, email, password: hashedPassword });
    }

    async obterUsuarioPorId(id) { return usuarioRepository.findById(id); }

    async atualizarUsuario(id, updateData) {
        const { email, password, ...rest } = updateData;
        const dataToUpdate = { ...rest };

        if (password) { dataToUpdate.password = await bcrypt.hash(password, 10); }

        if (email) {
            const existingUser = await usuarioRepository.findByEmail(email);
            if (existingUser && existingUser.id !== parseInt(id)) {
                throw new Error('Este email já está sendo usado por outro usuário.');
            }
        }
        return usuarioRepository.update(id, dataToUpdate);
    }

    async deletarUsuario(id) { return usuarioRepository.delete(id); }

    async validarCredenciais(email, password) {
        const usuario = await usuarioRepository.findByEmail(email);
        if (!usuario) { return null; }

        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) { return null; }

        const { password: _, ...usuarioSemSenha } = usuario;
        return usuarioSemSenha;
    }
}

module.exports = new UsuarioService(); 