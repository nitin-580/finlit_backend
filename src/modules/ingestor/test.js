const { runDailyPriceJob } = require("./jobs/dailyPriceJob");

runDailyPriceJob("ANANTRAJ")
  .then(() => console.log("Job finished"))
  .catch(console.error);
