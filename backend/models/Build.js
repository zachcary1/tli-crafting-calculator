const mongoose = require("mongoose");

const BuildSchema = new mongoose.Schema({
  itemType: { type: String, required: true },
  affixes: [{ type: String, required: true }],
  tiers: [{ type: Number, required: true }],
  estimatedCost: { type: Number, required: true }
});

module.exports = mongoose.model("Build", BuildSchema);
