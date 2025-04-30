// src/dataLoader.js
const fs      = require("fs");
const mongoose = require("mongoose");

async function loadData() {
    // grab the underlying native driver’s Db object
    const db       = mongoose.connection.db;
    // count via the collection name (lower-case, pluralized by default)
    const rawCount = await db.collection("spells").countDocuments({});
    if (rawCount > 0) return;    // already populated

    const raw    = fs.readFileSync("spells.json", "utf8");
    const spells = JSON.parse(raw);
    await db.collection("spells").insertMany(spells);
    console.log(`Loaded ${spells.length} spells into MongoDB.`);
}

module.exports = loadData;
