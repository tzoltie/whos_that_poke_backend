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
    const {
        id,
        name
    } = req.body

    try {
        validateUserInput(id, name)
        const found = await getPokemonById(Number(id))

        if(!found) {
            return dataResponse(res, 404, { error: ERR.POKEMON_ID_NOT_FOUND })
        }
        return dataResponse(res, 200, { results: found })
    } catch(e) {
        return dataResponse(res, 500, { error: e.message })
    }
}

const getPokemonAbilitiesById = async (req, res) => {
    const { id } = req.body

    try {
        validateUserInput(id, null)
        const found = await getPokemonAbilitiesById(Number(id))
        if(!found) {
            return dataResponse(res, 404, { error: ERR.POKEMON_ABILITIES_NOT_FOUND })
        }
        return dataResponse(res, 200, { results: found })
    } catch(e) {
        return dataResponse(res, 500, { error: e.message })
    }
}

module.exports = {
    getAllPokemon
}