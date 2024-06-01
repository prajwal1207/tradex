const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./Routes/tradeRoutes");
const authRouter = require("./Routes/auth");
const authMiddleware = require("./middleware/authMiddleware");
dotenv.config();
const app = express();

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then((obj) => {
    console.log("DB connected successfully...");
  })
  .catch((err) => console.log(err));

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/", authMiddleware, routes);
app.use("/api/user/", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`server has started on the port no ${process.env.PORT}`);
});

module.exports = app;
