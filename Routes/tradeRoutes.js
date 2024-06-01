const express = require("express");
const { getTrades, addTrade, getTradesById } = require("../Controllers/Trade");
const routes = express.Router();

routes.get("/trade", getTrades);
routes.get("/trade/:id", getTradesById);
routes.post("/trade", addTrade);

module.exports = routes;
