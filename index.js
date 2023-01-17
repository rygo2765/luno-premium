import { fetchBTCMYR } from './lib/luno.js'
import convRates from './lib/conv.js'
import binanceUSD from './lib/binance.js'
import { calc } from './lib/calculations.js'
import * as dotenv from 'dotenv' //import instead of require for .mjs file
dotenv.config()

//Retrieve BTCMYR data from Luno 
const btcLunoMYR = await fetchBTCMYR()
if (typeof btcLunoMYR !== "number") {
    throw 'Data retrieved from Luno is not a number'
}
//console.log(typeof btcLunoMYR)

// //Retrieve USDMYR conversion rate 
let convRate = await convRates(process.env.API_KEY)
if (typeof convRate !== "number") {
    throw 'Conversion rate retrieved is not a number'
}
//console.log(convRate)


//Call BTCUSD price from Binance 
let btcBinanceUSD = await binanceUSD()
if (typeof btcBinanceUSD !== "number") {
    throw 'Data retrieved from Binance is not a number'
}
//console.log(btcBinanceUSD);


//Calculate BTCUSD price from Luno, price diff & premium 
let { btcLunoUSD, priceDiff, percentDiff } = await calc(btcLunoMYR, convRate, btcBinanceUSD)
//console.log(typeof percentDiff)
// console.log(cryptMath.btcLunoUSD)
// console.log(cryptMath.priceDiff)
// console.log(cryptMath.percentDiff)

//Print values
console.log("BTCMYR price on Luno:".padEnd(40, ' ') + "MYR ", btcLunoMYR)
console.log("USDMYR:".padEnd(44, ' '), convRate)
console.log("BTCUSD price on Luno:".padEnd(40, ' ') + "USD ", btcLunoUSD)
console.log("BTCUSD price on Binance:".padEnd(40, ' ') + "USD ", btcBinanceUSD)
console.log("Price difference:".padEnd(40, ' ') + "USD ", priceDiff)
console.log("Luno premium:".padEnd(44, ' '), percentDiff, "%")