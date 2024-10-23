const express = require("express")
const app = express()
const pokemonRouter = require("./route/pokemon.js")
const cors = require("cors")


app.use(express.json())
app.use(cors())
app.use('/pokemon', pokemonRouter)

module.exports = app