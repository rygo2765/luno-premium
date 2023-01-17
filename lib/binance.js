import Binance from 'node-binance-api' //import instead of require for .mjs file
const client = new Binance()

export default async function binancePrice() {
    let test = await client.prices('BTCBUSD')
    if (Number.isFinite(test.BTCBUSD) == true) {
        let btcBinanceUSD = test.BTCBUSD
        return btcBinanceUSD
    }
    else {
        return "Failed to retrieve price"
    }
    // let btcBinanceUSD = test.BTCBUSD
    // return btcBinanceUSD
}