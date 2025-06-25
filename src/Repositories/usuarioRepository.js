// src/repositories/usuarioRepository.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 

class UsuarioRepository {
    async create(userData) { return prisma.usuario.create({ data: userData }); }
    async findByEmail(email) { return prisma.usuario.findUnique({ where: { email } }); }
    async findById(id) { return prisma.usuario.findUnique({ where: { id: parseInt(id) } }); }
    async update(id, updateData) { return prisma.usuario.update({ where: { id: parseInt(id) }, data: updateData }); }
    async delete(id) { return prisma.usuario.delete({ where: { id: parseInt(id) } }); }
}

module.exports = new UsuarioRepository(); 
