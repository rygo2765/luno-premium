import { fetchBTCMYR } from './lib/luno.js'
import convRates from './lib/conv.js'
import binanceUSD from './lib/binance.js'
import { calc } from './lib/calculations.js'
import * as dotenv from 'dotenv' //import instead of require for .mjs file
dotenv.config()

//Retrieve BTCMYR data from Luno 
const btcLunoMYR = await fetchBTCMYR()
// console.log(btcLunoMYR)

// //Retrieve USDMYR conversion rate 
let convRate = await convRates(process.env.API_KEY)
// console.log(convRate)


//Call BTCUSD price from Binance 
let btcBinanceUSD = await binanceUSD()
// console.log(btcBinanceUSD);


//Calculate BTCUSD price from Luno, price diff & premium 
let cryptMath = await calc(btcLunoMYR, convRate, btcBinanceUSD)
// console.log(cryptMath.btcLunoUSD)
// console.log(cryptMath.priceDiff)
// console.log(cryptMath.percentDiff)

//Print values
console.log("BTCMYR price on Luno:".padEnd(40, ' ') + "MYR ", btcLunoMYR)
console.log("USDMYR:".padEnd(44, ' '), convRate)
console.log("BTCUSD price on Luno:".padEnd(40, ' ') + "USD ", cryptMath.btcLunoUSD)
console.log("BTCUSD price on Binance:".padEnd(40, ' ') + "USD ", btcBinanceUSD)
console.log("Price difference:".padEnd(40, ' ') + "USD ", cryptMath.priceDiff)
console.log("Luno premium:".padEnd(44, ' '), cryptMath.percentDiff, "%")