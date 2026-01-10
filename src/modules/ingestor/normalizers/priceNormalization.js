function normalizePriceData(rawData, symbol) {
    const result = rawData.chart.result[0];
    const timestamps = result.timestamp;
    const indicators = result.indicators.quote[0];
  
    const candles = [];
  
    for (let i = 0; i < timestamps.length; i++) {
      const open = indicators.open[i];
      const high = indicators.high[i];
      const low = indicators.low[i];
      const close = indicators.close[i];
      const volume = indicators.volume[i];

      if (
        open == null ||
        high == null ||
        low == null ||
        close == null
      ) continue;
  
      const date = new Date(timestamps[i] * 1000)
        .toISOString()
        .slice(0, 10);
  
      candles.push({
        symbol,
        exchange: "NSE",
        date,
        open,
        high,
        low,
        close,
        volume: volume || 0,
        currency: "INR",
        source: "yahoo_finance",
      });
    }
    return candles;
  }
  
  module.exports = { normalizePriceData };