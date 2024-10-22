const dotenv = require("dotenv")
dotenv.config()
const pokeAPIUrl = process.env.POKEMON_API_URL

module.exports = pokeAPIUrl