const express = require("express")
const cors = require("cors")
const ProductRoute = require("./src/Routes/ProductRoute")
const usuarioRoutes = require('./src/Routes/usuarioRoutes')
const categoriaRoutes = require('./src/Routes/categoriaRoutes')
require("dotenv").config() 

// const produtoRoutes = require('./routes/produtoRoutes');
const authRoutes = require('./src/Routes/authRoutes'); 

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

app.use('/v1/product', ProductRoute);

app.use('/api/v1', usuarioRoutes);

app.use('/api/v1', categoriaRoutes);

app.use('/api/v1', authRoutes); 

app.listen(port, () => {
  console.log(`Documentação: http://localhost:${port}/docs`)
})
