const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

let db;

async function initializeDatabase() {
    db = await open({
        filename: "./conference-management.db",
        driver: sqlite3.Database,
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS conferences (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            date TEXT,
            location TEXT
        );
        
        CREATE TABLE IF NOT EXISTS registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            conference_id INTEGER,
            FOREIGN KEY (conference_id) REFERENCES conferences(id)
        );

        CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            feedback TEXT
        );
    `);

    console.log("Database initialized.");
}

module.exports = { getDb: () => db, initializeDatabase };
