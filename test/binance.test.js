beforeEach(() => {
    jest.resetModules() //reset module mocks before each test
})

// const MOCK_PRICE = 20000
// const MOCK_JSON_RESP = { BTCBUSD: MOCK_PRICE }

//import getBinancePrice from '../lib/binance.js'

// jest.mock('node-binance-api', () => {
//     return class Binance {
//         prices() {
//             return new Promise(resolve => resolve(MOCK_JSON_RESP));
//         }
//     }
// })

test("Returns Message for Successful Response", async () => {
    const getBinancePrice = require('../lib/binance.js').default //for export defaults 
    const MOCK_PRICE = 20000
    const MOCK_JSON_RESP = { BTCBUSD: MOCK_PRICE }
    jest.mock('node-binance-api', () => {
        return class Binance {
            prices() {
                return new Promise(resolve => resolve(MOCK_JSON_RESP));
            }
        }
    })
    expect(await getBinancePrice()).toBe(MOCK_PRICE);
});

test("Returns Message for Unsuccesful Response", async () => {
    const getBinancePrice = require('../lib/binance.js').default //for export defaults 
    jest.mock('node-binance-api', () => {
        return class Binance {
            prices() {
                return new Promise(resolve => resolve("Failed to retrieve price"));
            }
        }
    })
    expect(await getBinancePrice()).toBe("Failed to retrieve price");
});