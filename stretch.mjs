import Binance from 'node-binance-api' //import instead of require for .mjs file
const client = Binance()
import * as dotenv from 'dotenv' //import instead of require for .mjs file
dotenv.config()

//Retrieve crypto data from Luno 
async function fetchLunoMYR(){
    let url = "https://api.luno.com/api/1/ticker?pair="
    url = url.concat(process.env.CRYPTO_LUNO)
    const response = await fetch(url)
    const lunoMYR = await response.json()
    return lunoMYR['bid']
  }
  
  const cryptoLunoMYR = await fetchLunoMYR()
  //console.log(cryptoLunoMYR)

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
let test =await client.prices(process.env.CRYPTO_BINANCE)
let cryptoBinanceUSD = test[process.env.CRYPTO_BINANCE]
//console.log(cryptoBinanceUSD);

//Name change if Luno pair is BTCMYR since it's XBTMYR
let nameLunoMYR = process.env.CRYPTO_LUNO 
if (nameLunoMYR === "XBTMYR"){
  nameLunoMYR = nameLunoMYR.replace('XBT','BTC')
}
let nameLunoUSD = nameLunoMYR.replace('MYR','USD')

//Calculate BTCUSD price from Luno, price diff & premium 
let cryptoLunoUSD = cryptoLunoMYR / convRate
let priceDiff = Math.abs(cryptoLunoUSD - cryptoBinanceUSD)
let percentDiff = (priceDiff/cryptoLunoUSD)*100
percentDiff = percentDiff.toFixed(2)
console.log(nameLunoMYR, " price on Luno:        MYR ", cryptoLunoMYR)
console.log("USDMYR:                           ", convRate)
console.log(nameLunoUSD, " price on Luno:        USD ", cryptoLunoUSD)
console.log(process.env.CRYPTO_BINANCE, " price on Binance:    USD ", cryptoBinanceUSD)
console.log("Price difference:             USD ", priceDiff)
console.log("Luno premium:                     ", percentDiff, "%")