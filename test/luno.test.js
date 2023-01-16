const MOCK_PRICE = 91000
const MOCK_JSON_RESP = { bid: MOCK_PRICE }

global.fetch = jest.fn(() => Promise.resolve({
    status: 200,
    json: () => Promise.resolve(MOCK_JSON_RESP)
}))

import { fetchBTCMYR } from '../lib/luno.js'

test("Returns the correct price", async () => {
    expect(await fetchBTCMYR()).toBe(MOCK_PRICE)
})