beforeEach(() => {
    jest.resetModules() //reset module mocks before each test
})

import { premiumCalc } from '../lib/calculations.js'

test("Shows premium in console if all good", async () => {
    const getPremium = require('../index.js').default

    //Mock Luno Price 
    const MOCK_LUNO_PRICE = 91000
    //const MOCK_JSON_RESP = { bid: MOCK_LUNO_PRICE }
    jest.mock('../lib/luno.js', () => {
        return {
            fetchLuno() {
                return new Promise(res => {
                    res(MOCK_LUNO_PRICE)
                })
            }
        }
    })

    //Mock Exchange Rate
    const MOCK_RATE = 4.5
    jest.mock('../lib/conv.js', () => {
        return function fetchRates() {
            return new Promise(res => {
                res(MOCK_RATE)
            })
        }
    })

    //Mock Binance Price 
    const MOCK_BINANCE_PRICE = 20000
    jest.mock('../lib/binance.js', () => {
        return function getBinancePrice() {
            return new Promise(res => {
                res(MOCK_BINANCE_PRICE)
            })
        }
    })

    let { btcLunoUSD, priceDiff, percentDiff } = await premiumCalc(MOCK_LUNO_PRICE, MOCK_RATE, MOCK_BINANCE_PRICE)

    console.debug = jest.fn(() => undefined);
    await getPremium()

    expect(console.debug).toHaveBeenCalledWith("BTCMYR price on Luno:".padEnd(40, ' ') + "MYR ", MOCK_LUNO_PRICE);

    expect(console.debug).toHaveBeenCalledWith("USDMYR:".padEnd(44, ' '), MOCK_RATE);

    expect(console.debug).toHaveBeenCalledWith("BTCUSD price on Luno:".padEnd(40, ' ') + "USD ", btcLunoUSD);

    expect(console.debug).toHaveBeenCalledWith("BTCUSD price on Binance:".padEnd(40, ' ') + "USD ", MOCK_BINANCE_PRICE);

    expect(console.debug).toHaveBeenCalledWith("Price difference:".padEnd(40, ' ') + "USD ", priceDiff);

    expect(console.debug).toHaveBeenCalledWith("Luno premium:".padEnd(44, ' '), percentDiff, "%");
})