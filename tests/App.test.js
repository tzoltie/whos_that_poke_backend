const { describe, beforeEach } = require("node:test");
const { getAllPokemonPokeAPI } = require("../domain/pokemon");
const results = require("./mockData");
const { getAllPokemon } = require("../controller/pokemon");
const { dataResponse } = require("../utils/responses");

jest.mock("../utils/responses.js")
jest.mock("../domain/pokemon")

describe('fetch all pokemon from the poki API', () => {
    const mockReq = {}
    const mockRes = {}

    beforeEach(() => {
        jest.clearAllMocks()
        mockRes.status = jest.fn().mockReturnRes(mockRes)
        mockRes.json = jest.fn()
    })
    test('the api returns an array inside the results key of pokemon if successful', async () => {
        
        const result = {
                count: 1302,
			    next: "https://pokeapi.co/api/v2/pokemon/?offset=100&limit=50",
			    previous: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50",
                results: results,
                }
        getAllPokemonPokeAPI.mockResolvedValue(result)
        const allPokemon = await getAllPokemonPokeAPI()
        expect(allPokemon).toEqual(result)
    })
    test('the get all pokemon function should call the data response function with the res, status code, and results to send result to user', async () => {
        const result = {
                count: 1302,
			    next: "https://pokeapi.co/api/v2/pokemon/?offset=100&limit=50",
			    previous: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50",
                results: results,
            }
        const data = {
            status: "success",
            data: {
                apiResults: result
            }
        }

        const response = await getAllPokemon(mockReq, mockRes)
        expect(dataResponse).toHaveBeenCalledWith(mockRes, 200, { apiResults: result})
    })
    test('the get all pokemon function should return a status of success if successful', async () => {
        const result = {
            count: 1302,
            next: "https://pokeapi.co/api/v2/pokemon/?offset=100&limit=50",
            previous: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50",
            results: results,
        }
        getAllPokemonPokeAPI.mockResolvedValue(result)
        const response = await getAllPokemon(mockReq, mockRes)

        expect(dataResponse).toHaveBeenCalledWith(mockRes, 200, { apiResults: result })
        expect(dataResponse).toBe(mockRes, 200, { status: "success", data: { apiResults: result }})
    })
})