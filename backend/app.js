const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const { initializeDatabase } = require("./database");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("frontend"));

// Routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

(async () => {
    try {
        await initializeDatabase(); // Initialize the database before starting the server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error initializing the database:", error.message);
    }
})();
