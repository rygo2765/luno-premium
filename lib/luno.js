//retrieve BTCMYR price from Luno
export async function fetchBTCMYR() {
    const response = await fetch("https://api.luno.com/api/1/ticker?pair=XBTMYR")
    if (response.status === 200) {
        const BTCMYR = await response.json()
        return BTCMYR['bid']
    }
    else {
        return "Failed to retrieve price"
    }
}