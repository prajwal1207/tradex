const TradeModel = require("../../Model/Trade");

const getTrades = async (req, res) => {
  try {
    const result = await TradeModel.find();
    res.status(200).json({
      status: "ok",
      length: result.length,
      data: result,
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
    console.log(error);
  }
};
const getTradesById = async (req, res) => {
  try {
    const result = await TradeModel.findById(req.params.id);
    res.status(200).json({
      status: "ok",
      data: result,
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
    console.log(error);
  }
};

const addTrade = async (req, res) => {
  try {
    const result = await TradeModel.create(req.body);
    res.status(201).json({
      status: "ok",
      data: result,
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
    console.log(error);
  }
};

module.exports = { getTrades, addTrade, getTradesById };
