const Binance = require("node-binance-api")

const binance = new Binance()

async function getPrice(symbol) {
    const ticker = await binance.prices()
    console.log(`Price of BNB: ${ticker.BNBUSDT}`)
}

getPrice()