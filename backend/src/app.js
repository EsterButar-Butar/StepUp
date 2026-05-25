const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const connectDB = require("./config/db");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// CORS — batasi origin supaya ga bisa diakses dari domain random
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map(s => s.trim());

app.use(cors({
    origin: function (origin, callback) {
        // Izinkan request tanpa origin (Postman, curl, mobile app)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error("Blocked by CORS"));
    },
    credentials: true
}));

app.use(express.json({ limit: "5mb" }));

// Rate limit global — 100 request per 15 menit per IP (dinaikkan untuk development)
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: { message: "Terlalu banyak request, coba lagi nanti" }
});
app.use("/api", globalLimiter);

// Rate limit khusus auth — lebih ketat biar ga di-brute force (dinaikkan untuk testing)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { message: "Terlalu banyak percobaan login, coba lagi nanti" }
});
app.use("/api/auth", authLimiter);

app.use("/api", routes);

app.get("/", (req, res) => {
    res.json({ message: "Backend StepUp running" });
});

// Harus di paling bawah — tangkap error yang tidak di-handle controller
app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});