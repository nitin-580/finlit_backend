import { Kafka } from "kafkajs";
import { Point } from "@influxdata/influxdb-client";
import { writeApi } from "../influx/client.js";

const kafka = new Kafka({
  clientId: "price-db-writer",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: "price-writers",
});

await consumer.connect();
await consumer.subscribe({ topic: "market.prices.daily" });

await consumer.run({
  eachMessage: async ({ message }) => {
    const candle = JSON.parse(message.value.toString());

    const point = new Point("price_candles")
      .tag("symbol", candle.symbol)
      .tag("exchange", candle.exchange)
      .floatField("open", candle.open)
      .floatField("high", candle.high)
      .floatField("low", candle.low)
      .floatField("close", candle.close)
      .intField("volume", candle.volume)
      .timestamp(new Date(`${candle.date}T15:30:00+05:30`));

    writeApi.writePoint(point);
  },
});

// graceful shutdown
process.on("SIGINT", async () => {
  await writeApi.close();
  process.exit(0);
});