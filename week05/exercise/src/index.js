"use strict";

const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routers/userRouter");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (_req, res) => {
  res.send("Server Running..");
});

app.use("/api/user", userRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
