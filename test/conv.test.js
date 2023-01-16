const MOCK_RATE = 4.5
const MOCK_JSON_RESP = {
    rates:
        { MYR: MOCK_RATE }
}

//Substitutes line 9 - line 10 into conv.js response object. Will only contain status and rates
global.fetch = jest.fn(() => Promise.resolve({
    status: 200,
    json: () => Promise.resolve(MOCK_JSON_RESP)
}))

import convRate from '../lib/conv.js'

test("Returns the correct conversion rate", async () => {
    expect(await convRate()).toBe(MOCK_RATE)
})