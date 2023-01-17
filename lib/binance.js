import Binance from 'node-binance-api' //import instead of require for .mjs file
const client = new Binance()

export default async function binancePrice() {
    try {
        let resp = await client.prices('BTCBUSD')
        let price = +resp.BTCBUSD
        if (Number.isFinite(price) == true) {
            let btcBinanceUSD = price
            return btcBinanceUSD
        }
        else {
            throw "Fetch failed"
        }
    } catch (err) {
        if (err == "Fetch failed") {
            return "Failed to retrieve price"
        }
        throw err
    }


    // let btcBinanceUSD = test.BTCBUSD
    // return btcBinanceUSD
}