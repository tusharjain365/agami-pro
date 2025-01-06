const express = require("express");
// const {db} = require("../database");

const { getDb } = require("../database");

const router = express.Router();

// Register for a conference
router.post("/register", async (req, res) => {
    const { name, email, conferenceId } = req.body;

    const db = getDb();

    await db.run(
        `INSERT INTO registrations (name, email, conference_id) VALUES (?, ?, ?)`,
        [name, email, conferenceId]
    );
    res.send("Registration successful.");
});

// View schedule
router.get("/schedule", async (req, res) => {
    const db = getDb();
    const schedule = await db.all(`SELECT * FROM conferences`);
    res.json(schedule);
});

// Submit feedback
router.post("/feedback", async (req, res) => {
    const { name, feedback } = req.body;

    const db = getDb();

    await db.run(`INSERT INTO feedback (name, feedback) VALUES (?, ?)`, [
        name,
        feedback,
    ]);
    res.send("Feedback submitted successfully.");
});

module.exports = router;
