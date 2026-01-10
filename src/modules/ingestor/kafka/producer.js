const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: "market-ingestor",
    brokers: ["localhost:9092"],
});

const producer = kafka.producer();

let isConnected = false;

async function connectProducer() {
    await producer.connect();
    isConnected = true;
    console.log("✅ Kafka producer connected")
}

module.exports ={
    producer, connectProducer
}