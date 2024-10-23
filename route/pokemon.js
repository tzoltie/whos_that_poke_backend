const express = require("express")
const { getAllPokemon, getPokemonById, getPokemonAbilitiesById, userAnswer } = require("../controller/pokemon")
const router = express.Router()


router.get('/', getAllPokemon)
router.get('/:id', getPokemonById)
router.get('/abilities/:id', getPokemonAbilitiesById)
router.post('/answer/:id', userAnswer)

module.exports = router