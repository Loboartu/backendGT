const express = require("express")
const cors = require("cors")
const productRoutes = require('./src/routes/productRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const categoriaRoutes = require('./src/routes/categoriaRoutes');
require("dotenv").config() 

const authRoutes = require('./src/routes/authRoutes'); 

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

app.use('/v1/product', productRoutes);

app.use('/api/v1', usuarioRoutes);

app.use('/api/v1', categoriaRoutes);

app.use('/api/v1', authRoutes); 

app.listen(port, () => {
  console.log(`Documentação: http://localhost:${port}/docs`)
})
