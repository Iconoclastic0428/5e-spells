require("dotenv").config();
const express  = require("express");
const mongoose = require("mongoose");
const loadData = require("./dataloader");   // <-- match your filename exactly, lowercase!

async function start() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await loadData();  // populates spells on first run

    const app = express();

    // health‐check:
    app.get("/", (req, res) => res.send("🪄 Spell API is alive"));

    // your query endpoint:
    app.get("/spells", async (req, res) => {
        const { name } = req.query;
        if (!name) return res.status(400).json({ error: "name query required" });
        const db = mongoose.connection.db;
        const spells = await db
            .collection("spells")
            .find({ name: { $regex: name, $options: "i" } })
            .limit(50)
            .toArray();
        res.json(spells);
    });

    app.listen(process.env.PORT, () => {
        console.log(`Spell API listening on port ${process.env.PORT}`);
    });
}

start().catch(err => {
    console.error("Failed to start:", err);
    process.exit(1);
});
