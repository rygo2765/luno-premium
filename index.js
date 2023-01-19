//import used modules and dotenv
import { fetchLuno } from './lib/luno.js'
import fetchRates from './lib/conv.js'
import fetchBinance from './lib/binance.js'
import { premiumCalc } from './lib/calculations.js'
import * as dotenv from 'dotenv'
dotenv.config()

export default async function getPremium() {
    //Retrieve BTCMYR data from Luno 
    const btcLunoMYR = await fetchLuno()
    if (typeof btcLunoMYR !== "number") {
        throw 'Data retrieved from Luno is not a number'
    }


    // //Retrieve USDMYR conversion rate 
    let convRate = await fetchRates(process.env.API_KEY)
    if (typeof convRate !== "number") {
        throw 'Conversion rate retrieved is not a number'
    }


    //Call BTCUSD price from Binance 
    let btcBinanceUSD = await fetchBinance()
    if (typeof btcBinanceUSD !== "number") {
        throw 'Data retrieved from Binance is not a number'
    }


    //Calculate BTCUSD price from Luno, price diff & premium 
    let { btcLunoUSD, priceDiff, percentDiff } = await premiumCalc(btcLunoMYR, convRate, btcBinanceUSD)

    //Print values
    console.debug("BTCMYR price on Luno:".padEnd(40, ' ') + "MYR ", btcLunoMYR)
    console.debug("USDMYR:".padEnd(44, ' '), convRate)
    console.debug("BTCUSD price on Luno:".padEnd(40, ' ') + "USD ", btcLunoUSD)
    console.debug("BTCUSD price on Binance:".padEnd(40, ' ') + "USD ", btcBinanceUSD)
    console.debug("Price difference:".padEnd(40, ' ') + "USD ", priceDiff)
    console.debug("Luno premium:".padEnd(44, ' '), percentDiff, "%")
}