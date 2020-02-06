const { Schema, model, Types } = require("mongoose");

const User = new Schema({
  email: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  budget: [{ type: Types.ObjectId, ref: "Budget" }]
});

module.exports = model("User", User);
