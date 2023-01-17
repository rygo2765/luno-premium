//Receive BTC price from Luno in MYR, USDMYR conversion rate and BTC price from Binance in USD to calculate premium

export async function premiumCalc(btcLunoMYR, convRate, btcBinanceUSD) {
    let btcLunoUSD = btcLunoMYR / convRate //convert Luno's BTC price from MYR to USD
    let priceDiff = Math.abs(btcLunoUSD - btcBinanceUSD) //calculate BTC price difference between Luno and Binance
    let percentDiff = (priceDiff / btcLunoUSD) * 100 //calcuate percentage of difference compared Luno price
    percentDiff = +percentDiff.toFixed(2) //return percentDiff as a number with 2 decimal place. 

    return {
        'btcLunoUSD': btcLunoUSD,
        'priceDiff': priceDiff,
        'percentDiff': percentDiff
    }
}