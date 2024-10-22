const express = require("express")
const { getAllPokemon, getPokemonById, getPokemonAbilitiesById } = require("../controller/pokemon")
const router = express.Router()

router.get('/', getAllPokemon)
router.get('/:id', getPokemonById)
router.get('/abilities/:id', getPokemonAbilitiesById)

module.exports = router