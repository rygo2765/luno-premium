//retrieve BTCMYR price from Luno
export async function fetchBTCMYR() {
    try {
        const response = await fetch("https://api.luno.com/api/1/ticker?pair=XBTMYR")
        if (response.status === 200) {
            const BTCMYR = await response.json()
            return +BTCMYR['bid']
        } else {
            throw "Fetch failed"
        }
    } catch (err) { //use catch (err) to catch abnormal cases i.e. response.status === 200 but BTCMYR['bid'] doesn't return value
        if (err == "Fetch failed") {
            return "Failed to retrieve price"
        }
        throw err //crash the application if we got an unexpected error 
    }


}