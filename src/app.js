// src/app.js
const express = require('express');
const userRoutes = require('./Routes/usuarioRoute');
const categoriaRoutes = require('./routes/categoriaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação

require('dotenv').config();

const app = express();

app.use(express.json());

// Monta todos os grupos de rotas sob o prefixo /api/v1
app.use('/api/v1', userRoutes);
app.use('/api/v1', categoriaRoutes);
app.use('/api/v1', produtoRoutes);
app.use('/api/v1', authRoutes); // Monta as rotas de autenticação

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado no servidor!');
});

module.exports = app;
