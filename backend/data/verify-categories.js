const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);  //debug

const usedCategoryIds = [
  "belt",
  "boots_dex",
  "boots_int",
  "boots_str",
  "bow",
  "cane",
  "chest_dex",
  "chest_int",
  "chest_str",
  "claw",
  "crossbow",
  "cudgel",
  "dagger",
  "fire_cannon",
  "gloves_dex",
  "gloves_int",
  "gloves_str",
  "helmet_dex",
  "helmet_int",
  "helmet_str",
  "musket",
  "necklace",
  "one_handed_axe",
  "one_handed_hammer",
  "one_handed_sword",
  "pistol",
  "ring",
  "rod",
  "scepter",
  "shield_dex",
  "shield_int",
  "shield_str",
  "spirit_ring",
  "tin_staff",
  "two_handed_axe",
  "two_handed_hammer",
  "two_handed_sword",
  "wand"
];

const Category = mongoose.model("Category", new mongoose.Schema({
  _id: String
}));

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");

  const existing = await Category.find({ _id: { $in: usedCategoryIds } }).select("_id").lean();
  const existingIds = existing.map(cat => cat._id);

  const missing = usedCategoryIds.filter(id => !existingIds.includes(id));

  if (missing.length > 0) {
    console.log("❌ Missing category IDs:", missing);
  } else {
    console.log("✅ All category IDs are valid and found in the database.");
  }

  mongoose.disconnect();
}

run().catch(err => console.error("❌ Error:", err));
