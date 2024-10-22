const pokeAPI_URL = require("../utils/config.js")

const getAllPokemonPokeAPI = async () => {
    const request = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(`${pokeAPI_URL}/pokemon`, request)
    
    return response.json()
}

const getPokemonByIdApi = async (id) => {
    const request = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(`${pokeAPI_URL}/pokemon/${id}`, request)

    return response.json()
}

const getPokemonAbilitiesByIdApi = async (id) => {
    const request = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(`${pokeAPI_URL}/ability/${id}`, request)
    return response.json()
}

module.exports = {
    getAllPokemonPokeAPI,
    getPokemonByIdApi,
    getPokemonAbilitiesByIdApi
}