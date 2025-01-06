const express = require("express");
// const {db} = require("../database");
const { getDb } = require("../database");

const router = express.Router();

// Create a conference
router.post("/create-conference", async (req, res) => {
    const { name, date, location } = req.body;
    const db = getDb();
    

    await db.run(
        `INSERT INTO conferences (name, date, location) VALUES (?, ?, ?)`,
        [name, date, location]
    );
    res.send("Conference created successfully.");
});

// View all registrations
router.get("/registrations", async (req, res) => {
    const db = getDb();

    const registrations = await db.all(`SELECT * FROM registrations`);
    res.json(registrations);
});

// View feedback
router.get("/feedback", async (req, res) => {
    const db = getDb();

    const feedback = await db.all(`SELECT * FROM feedback`);
    res.json(feedback);
});

module.exports = router;
