//retrive Binance BTCUSD price using Binance SDK
import Binance from 'node-binance-api'
const client = new Binance() //initialize new Binance client

export default async function binancePrice() {
    try {
        let resp = await client.prices('BTCBUSD')
        let price = +resp.BTCBUSD

        //test to ensure that price returned is a finite number
        if (Number.isFinite(price) == true) {
            let btcBinanceUSD = price
            return btcBinanceUSD
        }
        else { //if price returned is not a finite number, throw error and trigger catch
            throw "Fetch failed"
        }
    } catch (err) { //use catch (err) to catch abnormal or unexpected cases
        if (err == "Fetch failed") {
            return "Failed to retrieve price"
        }
        throw err
    }


    // let btcBinanceUSD = test.BTCBUSD
    // return btcBinanceUSD
}