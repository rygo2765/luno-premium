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

    try {
        const response = await fetch("https://api.apilayer.com/fixer/latest?symbols=MYR&base=USD", requestOptions)
        if (response.status === 200) {
            const USDMYR = await response.json()
            return USDMYR.rates['MYR']
        } else {
            throw "Fetch failed"
        }
    } catch (err) {
        if (err == "Fetch failed") {
            return "Failed to retrieve conversion rate"
        }
        throw err
    }
}