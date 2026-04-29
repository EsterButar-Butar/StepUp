const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const routes = require("./routes");
const assessmentRoutes = require("./routes/assessmentRoutes");

app.use("/api", routes);
app.use("/api/assessment", assessmentRoutes);

// test root
app.get("/", (req, res) => {
    res.json({ message: "Backend StepUp running" });
});

// database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});