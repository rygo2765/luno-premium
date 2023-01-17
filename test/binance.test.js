beforeEach(() => {
    jest.resetModules() //reset module mocks before each test
})

//test for a succesful fetch response from Binance
test("Returns Message for Successful Response", async () => {
    const getBinancePrice = require('../lib/binance.js').default //used .defaults for export defaults 
    const MOCK_PRICE = 20000
    const MOCK_JSON_RESP = { BTCBUSD: MOCK_PRICE }
    //mock Binance library
    jest.mock('node-binance-api', () => {
        return class Binance {
            //only mock the prices within class Binance
            prices() {
                return new Promise(resolve => resolve(MOCK_JSON_RESP));
            }
        }
    })
    expect(await getBinancePrice()).toBe(MOCK_PRICE);
});

//test for a unsuccesful fetch response from Binance
test("Returns Message for Unsuccesful Response", async () => {
    const getBinancePrice = require('../lib/binance.js').default //for export defaults 
    //mock Binance library
    jest.mock('node-binance-api', () => {
        return class Binance {
            prices() {
                return new Promise(resolve => resolve("Failed to retrieve price"));
            }
        }
    })
    expect(await getBinancePrice()).toBe("Failed to retrieve price");
});