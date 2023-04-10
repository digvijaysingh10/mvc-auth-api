const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const tokenSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
    ref: 'user',
    unique: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600
  }
});

const Token = mongoose.model('token', tokenSchema);
module.exports = Token