const { getAllPokemonPokeAPI, getPokemonById, getPokemonAbilitiesById } = require("../domain/pokemon")
const { dataResponse } = require("../utils/responses")
const { validateUserInput } = require("../utils/validateUserInput")
const ERR = require("../utils/errorMessages.js")

const getAllPokemon = async (req, res) => {
    try {
        const allPokemon = await getAllPokemonPokeAPI()
        return dataResponse(res, 200, { results: allPokemon })
    } catch (e) {
        return dataResponse(res, 404, { error: ERR.POKEMON_API_FAIL })
    }
}


const getPokemonById = async (req, res) => {
    const { name } = req.body
    const pokemonId = Number(req.params.id)

    try {
        validateUserInput(id, name)
        const found = await getPokemonById(pokemonId)

        if(!found) {
            return dataResponse(res, 404, { error: ERR.POKEMON_ID_NOT_FOUND })
        }
        return dataResponse(res, 200, { results: found })
    } catch(e) {
        return dataResponse(res, 500, { error: e.message })
    }
}

const getPokemonAbilitiesById = async (req, res) => {
    const pokemonId = Number(req.params.id)

    try {
        validateUserInput(id, null)
        const found = await getPokemonAbilitiesById(pokemonId)
        if(!found) {
            return dataResponse(res, 404, { error: ERR.POKEMON_ABILITIES_NOT_FOUND })
        }
        return dataResponse(res, 200, { results: found })
    } catch(e) {
        return dataResponse(res, 500, { error: e.message })
    }
}

module.exports = {
    getAllPokemon,
    getPokemonById,
    getPokemonAbilitiesById
}