const cron = require("node-cron");
const { connectProducer } = require("./kafka/producer");
const { runDailyPriceJob } = require("./jobs/dailyPriceJob");

async function startScheduler() {
  await connectProducer();

  cron.schedule("0 16 * * 1-5", async () => {
    console.log("Running daily market ingestion");

    const symbols = ["RELIANCE", "TCS", "INFY"];

    for (const symbol of symbols) {
      try {
        await runDailyPriceJob(symbol);
        console.log(`Ingested ${symbol}`);
      } catch (err) {
        console.error(`Failed for ${symbol}`, err.message);
      }
    }
  });
}

startScheduler();