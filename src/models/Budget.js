const { Schema, model, Types } = require("mongoose");

const Budget = new Schema({
  date: { type: String, required: true },
  income: { type: Number, required: true },
  expenses: { type: Number, required: true },
  amount: { type: Number, required: true },
  owner: { type: Types.ObjectId, ref: "User" }
});

module.exports = model("Budget", Budget);
