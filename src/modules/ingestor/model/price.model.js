import mongoose from "mongoose";

const PriceCandleSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    exchange: String,
    date: { type: String, required: true },
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number,
    currency: String,
    source: String,
},
{
    timestamps: true
})

PriceCan