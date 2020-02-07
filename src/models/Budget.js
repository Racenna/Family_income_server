const { Schema, model, Types } = require("mongoose");

const Budget = new Schema({
  //TODO
  owner: [{ type: Types.ObjectId, ref: "User" }]
});

module.exports = model("Budget", Budget);
