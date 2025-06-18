const express = require("express")
const cors = require("cors")
const ProductRoute = require("./src/routes/ProductRoute")
const usuarioRoutes = require('./src/Routes/usuarioRoutes')
const categoriaRoutes = require('./src/Routes/categoriaRoutes')
require("dotenv").config() 

// const produtoRoutes = require('./routes/produtoRoutes');
const authRoutes = require('./src/Routes/authRoutes'); // Importa as rotas de autenticação

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.use('/v1/product', ProductRoute)
// Monta todos os grupos de rotas sob o prefixo /api/v1
app.use('/api/v1', usuarioRoutes);
app.use('/api/v1', categoriaRoutes);
// app.use('/api/v1', produtoRoutes);
app.use('/api/v1', authRoutes); // Monta as rotas de autenticação

app.listen(port, () => {
  console.log(`Documentação: http://localhost:${port}/docs`)
})
