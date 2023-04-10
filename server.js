const express = require("express");
const { connectMongoDB } = require("./config/connection");

const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

const app = express();
const PORT = 8080;

app.use(express.json());

connectMongoDB("mongodb://localhost:27017/crud-test").then(() => {
  console.log("DB Connected!!!");
}).catch((err) => {
  console.log(`DB Connection Error: ${err.message}`);
  process.exit(1);
});

app.use("/users", userRouter, authRouter);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});
