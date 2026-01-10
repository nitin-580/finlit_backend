const { fetchDailyPrices } = require("../providers/yahoo/fetchPrices");
const { normalizePriceData } = require("../normalizers/priceNormalization");
const { publishPrices } = require("../kafka/publishPrices");

async function runDailyPriceJob(symbol) {
  const rawData = await fetchDailyPrices(symbol);
  const normalizedCandles = normalizePriceData(rawData, symbol);

  if (normalizedCandles.length === 0) {
    throw new Error("No valid candles after normalization");
  }

  await publishPrices(normalizedCandles);
}

module.exports = { runDailyPriceJob };