import Binance from 'node-binance-api' //import instead of require for .mjs file
const client = Binance()
import * as dotenv from 'dotenv' //import instead of require for .mjs file
dotenv.config()

//Retrieve BTCMYR data from Luno 
async function fetchBTCMYR(){
  const response = await fetch("https://api.luno.com/api/1/ticker?pair=XBTMYR")
  const BTCMYR = await response.json()
  return BTCMYR['bid']
}

const btcLunoMYR = await fetchBTCMYR()
console.log(btcLunoMYR)

//Retrieve USDMYR conversion rate 
async function fetchConv(){
  let myHeaders = new Headers();
  myHeaders.append("apikey", process.env.API_KEY);

  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  const response = await fetch("https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD", requestOptions)
  const USDMYR = await response.json()
  return USDMYR.rates['MYR'] 
}

const convRate = await fetchConv()
//console.log(convRate)


//Call BTCUSD price from Binance 
let test =await client.prices('BTCBUSD')
let btcBinanceUSD = test.BTCBUSD
//console.log(btcBinanceUSD);


//Calculate BTCUSD price from Luno, price diff & premium 
let btcLunoUSD = btcLunoMYR / convRate
let priceDiff = Math.abs(btcLunoUSD - btcBinanceUSD)
let percentDiff = (priceDiff/btcLunoUSD)*100
percentDiff = percentDiff.toFixed(2)
console.log("BTCMYR price on Luno:        MYR ", btcLunoMYR)
console.log("USDMYR:                          ", convRate)
console.log("BTCUSD price on Luno:        USD ", btcLunoUSD)
console.log("BTCUSD price on Binance:     USD ", btcBinanceUSD)
console.log("Price difference:            USD ", priceDiff)
console.log("Luno premium:                    ", percentDiff, "%")