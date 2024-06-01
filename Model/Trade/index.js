const mongoose = require("mongoose");

const trade = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  status: { type: String, required: true },
  market: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  lotSize: {
    type: Number,
    required: true,
  },
  entry: {
    type: Number,
  },
  sl: {
    type: Number,
  },
  tp: {
    type: Number,
  },
  risk_reward: {
    type: Number,
    default: function () {
      return Math.abs(this.sl / this.tp);
    },
  },
  setup: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  learning: {
    type: String,
  },
  news: {
    type: Boolean,
    required: true,
  },
  net_gain: {
    type: Number,
    required: true,
  },
  net_loss: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  modtifiedAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const TradeModel = mongoose.model("Trade", trade);

module.exports = TradeModel;
