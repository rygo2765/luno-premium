import * as dotenv from 'dotenv' //import instead of require for .mjs file
dotenv.config()

export default async function fetchConv(api) {
    let myHeaders = new Headers();
    myHeaders.append("apikey", api);

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    const response = await fetch("https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD", requestOptions)
    const USDMYR = await response.json()
    return USDMYR.rates['MYR']
}