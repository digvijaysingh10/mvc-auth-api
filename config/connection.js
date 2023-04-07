const mongoose = require("mongoose");
mongoose.set('strictQuery', true)
async function connectMongoDB(url) {
  return mongoose.connect(url);
}
module.exports = {
  connectMongoDB,
};
