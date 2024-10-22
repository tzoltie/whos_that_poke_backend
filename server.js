const express = require("express")
const app = express()
const pokemonRouter = require("./route/pokemon.js")

app.use(express.json())
app.use('/pokemon', pokemonRouter)

module.exports = app