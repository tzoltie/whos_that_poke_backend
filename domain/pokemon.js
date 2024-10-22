const pokeAPI_URL = process.env.POKEMON_API_URL

const getAllPokemonPokeAPI = async () => {
    const request = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(`${pokeAPI_URL}`, request)
    
    return response.json()
}

const getPokemonById = async (route) => {
    const request = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(`${pokeAPI_URL}/${route}`, request)

    return response.json()
}

module.exports = {
    getAllPokemonPokeAPI,
    getPokemonById
}