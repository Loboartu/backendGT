const express = require("express")
const cors = require("cors")
const ProductRoute = require("./src/routes/ProductRoute")
require("dotenv").config() 

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

app.listen(port, () => {
  console.log(`Documentação: http://localhost:${port}/docs`)
})
