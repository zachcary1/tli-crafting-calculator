const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const Category = mongoose.model("Category", new mongoose.Schema({
  _id: String,
  name: String,
  slot: String,
  slotRules: {
    canEquipLeft: Boolean,
    canEquipRight: Boolean,
    requiresTwoHands: Boolean
  },
  affixPoolId: String
}));

const categories = JSON.parse(fs.readFileSync("./data/categories.json"));

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");

  await Category.deleteMany();
  console.log("🧹 Old categories removed");

  await Category.insertMany(categories);
  console.log("✅ New categories inserted");

  mongoose.disconnect();
}

run().catch(err => {
  console.error("❌ Seeding failed:", err);
});
