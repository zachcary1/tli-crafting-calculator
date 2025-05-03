const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const NonLegendaryItem = mongoose.model("NonLegendaryItem", new mongoose.Schema({
  affixPoolId: String
}));

const AffixPool = mongoose.model("AffixPool", new mongoose.Schema({
  _id: String
}));

async function run() {
  console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");

  const usedIds = await NonLegendaryItem.distinct("affixPoolId");
  const validIds = await AffixPool.find({}, "_id").lean();
  const validSet = new Set(validIds.map(pool => pool._id));

  const invalid = usedIds.filter(id => !validSet.has(id));
  if (invalid.length === 0) {
    console.log("✅ All affixPoolIds are valid and exist in the affix pool collection.");
  } else {
    console.log("❌ Invalid affixPoolIds found:");
    console.log(invalid);
  }

  mongoose.disconnect();
}

run().catch(console.error);
