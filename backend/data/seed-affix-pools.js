const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// === Inline schema definitions ===
const TierSchema = new mongoose.Schema({
  tier: Number,
  requiredLevel: Number,
  min: Number,
  max: Number,
  weight: Number
}, { _id: false });

const AffixSchema = new mongoose.Schema({
  id: String,
  stat: String,
  description: String,
  tiers: [TierSchema]
}, { _id: false });

const AffixPoolSchema = new mongoose.Schema({
  _id: String,
  baseAffix: [AffixSchema],
  sweetDream: [AffixSchema],
  nightmare: [AffixSchema],
  prefixes: {
    basic: [AffixSchema],
    advanced: [AffixSchema],
    ultimate: [AffixSchema]
  },
  suffixes: {
    basic: [AffixSchema],
    advanced: [AffixSchema],
    ultimate: [AffixSchema]
  }
});

const AffixPool = mongoose.model("AffixPool", AffixPoolSchema);

// === Seeding logic ===
async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");

  const affixPools = JSON.parse(fs.readFileSync("./backend/data/affix-pools.json", "utf-8"));

  await AffixPool.deleteMany();
  console.log("🧹 Cleared old affix pools");

  await AffixPool.insertMany(affixPools);
  console.log("✅ Seeded new affix pools");

  mongoose.disconnect();
}

run().catch(err => {
  console.error("❌ Error during seeding:", err);
});
