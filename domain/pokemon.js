const pokeAPI_URL = process.env.POKEMON_API_URL

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

const getPokemonById = async (id) => {
    const request = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(`${pokeAPI_URL}/pokemon/${id}`, request)

    return response.json()
}

const getPokemonAbilitiesById = async (id) => {
    const request = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(`${pokeAPI_URL}/ability/id`, request)
    return response.json()
}

module.exports = {
    getAllPokemonPokeAPI,
    getPokemonById,
    getPokemonAbilitiesById
}