const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

const fs = require("fs");

// Define the schema inline (optional if already defined elsewhere)
const NonLegendaryItem = mongoose.model("NonLegendaryItem", new mongoose.Schema({
  name: String,                   //Ranger's Broken Mask
  categoryId: String,             //helmet_str
  requiredLevel: Number,          //82
  itemLevel: Number,              // blank
  baseStat: {
    value: { type: Number, required: false },
    type: { type: String, required: false }
  },
  weaponStats: {
    physicalDPS: Number,          // blank
    physicalDamage: Number,       // blank
    critRating: Number,           // blank
    attackSpeed: Number           // blank
  },
  affixPoolId: String             //helmet_str
}));

async function run() {
  console.log("MONGO_URI:", process.env.MONGO_URI); // DEBUG LINE
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");

  const items = JSON.parse(fs.readFileSync(__dirname + "/non-legendary-items.json", "utf-8"));

  await NonLegendaryItem.deleteMany();
  console.log("🧹 Old items removed");

  await NonLegendaryItem.insertMany(items);
  console.log("✅ New items inserted");

  mongoose.disconnect();
}

run().catch((err) => console.error("❌ Seeding failed:", err));
