//retrieve BTCMYR price from Luno
export async function fetchBTCMYR() {
    const response = await fetch("https://api.luno.com/api/1/ticker?pair=XBTMYR")
    const BTCMYR = await response.json()
    return BTCMYR['bid']
}