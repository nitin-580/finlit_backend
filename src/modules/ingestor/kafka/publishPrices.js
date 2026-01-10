const { producer,connectProducer } = require("./producer");

async function publishPrices(candles) {
  await connectProducer();
  
  const messages = candles.map(candle => ({
    key: candle.symbol,
    value: JSON.stringify(candle),
  }));

  await producer.send({
    topic: "market.prices.daily",
    messages,
  });
}

module.exports = { publishPrices };