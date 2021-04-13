const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

/**
 * Middleware
 */
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

/**
 * Define routes
 */
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/plaid", require("./routes/api/plaid"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
