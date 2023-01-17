import { fetchBTCMYR } from '../lib/luno.js'

//test luno.js when returns correct price
test("Returns the correct price", async () => {
    const MOCK_PRICE = 91000
    const MOCK_JSON_RESP = { bid: MOCK_PRICE }

    global.fetch = jest.fn(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(MOCK_JSON_RESP)
    }))
    expect(await fetchBTCMYR()).toBe(MOCK_PRICE)
})

//test luno.js when the 
test("Returns an error in retrieving price", async () => {
    const MOCK_STATUS_CODE = 500

    global.fetch = jest.fn(() => Promise.resolve({
        status: MOCK_STATUS_CODE,
        json: () => { }
    }));
    expect(await fetchBTCMYR()).toBe("Failed to retrieve price");
});

