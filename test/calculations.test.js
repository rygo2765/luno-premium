import { calc } from '../lib/calculations.js'

test("Returns the correct calculated values", async () => {
    expect(await calc(10, 2, 3)).toEqual({
        'btcLunoUSD': 5,
        'priceDiff': 2,
        'percentDiff': "40.00",
    });
});
