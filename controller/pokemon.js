const { getAllPokemonPokeAPI, getPokemonByIdApi, getPokemonAbilitiesByIdApi } = require("../domain/pokemon")
const { dataResponse } = require("../utils/responses")
const { validateUserInput } = require("../utils/validateUserInput")
const ERR = require("../utils/errorMessages.js")

const getAllPokemon = async (req, res) => {
    try {
        const allPokemon = await getAllPokemonPokeAPI()
        return dataResponse(res, 200, { apiResults: allPokemon })
    } catch (e) {
        return dataResponse(res, 404, { error: ERR.POKEMON_API_FAIL })
    }
}


const getPokemonById = async (req, res) => {
    const pokemonId = Number(req.params.id)

    try {
        const found = await getPokemonByIdApi(pokemonId)
        const pokemonList = await getAllPokemonPokeAPI()
        const nameList = pokemonList.results
        let pokemonNameList = []
        while(pokemonNameList.length < 3) {
            const namePicker = nameList[Math.floor(Math.random() * nameList.length)]
            const alreadySelected = pokemonNameList.find((poke) => poke.name === namePicker.name)
            if(!alreadySelected) {
                pokemonNameList.push(namePicker)
            }
        }
        pokemonNameList.push(found.species)

        const scrambleNames = pokemonNameList.sort(() => Math.random() - 0.5)
        
        if(!found) {
            return dataResponse(res, 404, { error: ERR.POKEMON_ID_NOT_FOUND })
        }
        return dataResponse(res, 200, { apiResults: "poke-found", pokemon: { id: found.id, image: found.sprites.front_default}, names: scrambleNames })
    } catch(e) {
        return dataResponse(res, 500, { error: e.message })
    }
}

const getPokemonAbilitiesById = async (req, res) => {
    const pokemonId = Number(req.params.id)

    try {
        const found = await getPokemonAbilitiesByIdApi(pokemonId)
        if(!found) {
            return dataResponse(res, 404, { error: ERR.POKEMON_ABILITIES_NOT_FOUND })
        }
        return dataResponse(res, 200, { apiResults: found })
    } catch(e) {
        return dataResponse(res, 500, { error: e.message })
    }
}

const userAnswer = async (req, res) => {
    const pokemonId = Number(req.params.id)
    const { name } = req.body


    try {
        validateUserInput(pokemonId, name)
        const found = await getPokemonByIdApi(pokemonId)

        if(!found) {
            return dataResponse(res, 404, { error: ERR.POKEMON_ID_NOT_FOUND})
        }

        const abilites = await getPokemonAbilitiesByIdApi(pokemonId)
        let abilitiesDesc = []

        if(Array.from(abilites.effect_entries)) {
            const abilityEng = abilites.effect_entries.find((ability) => ability.language.name === "en")
            abilitiesDesc.push(abilityEng)
        }

        if(found.name === name) {
            return dataResponse(res, 201, { apiResults: "correct!", pokemon: { name: found.name, image: found.sprites.front_default, abilites: abilitiesDesc, hp: found.stats[0].base_stat }})
        } else {
            return dataResponse(res, 201, { apiResults: "incorrect!", pokemon: { name: found.name, image: found.sprites.front_default, abilites: abilitiesDesc, hp: found.stats[0].base_stat }})
        }
    } catch(e) {
        return dataResponse(res, 500, { error: ERR.SOMETHING_WENT_WRONG })
    }
}

module.exports = {
    getAllPokemon,
    getPokemonById,
    getPokemonAbilitiesById,
    userAnswer
}