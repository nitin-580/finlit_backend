import { fetchDailyPrices } from "./providers/yahoo/fetchPrices.js";
import { normalizePriceData } from "./normalizers/priceNormalization.js";

const raw = await fetchDailyPrices("RELIANCE");
const candles = normalizePriceData(raw, "RELIANCE");

console.log(candles[0]);