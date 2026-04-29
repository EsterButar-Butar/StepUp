const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const routes = require("./routes");

app.use("/api", routes);

// test root
app.get("/", (req, res) => {
    res.json({ message: "Backend StepUp running" });
});

// database
const connectDB = require("./config/db");
connectDB();

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});