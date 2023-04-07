const express = require("express");
const { connectMongoDB } = require("./config/connection");

const userRouter = require("./routes/userRouter");

const app = express();
const PORT = 8080;

connectMongoDB("mongodb://localhost:27017/crud-test").then(() => {
  console.log("DB Connected!!!");
});

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server started at PORT:${PORT}`);
});
