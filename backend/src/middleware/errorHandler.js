// Tangkap semua error yang tidak di-handle controller — biar ga crash servernya
function errorHandler(err, req, res, next) {
    console.error(`[ERROR] ${req.method} ${req.originalUrl} —`, err.message);

    // Mongoose validation error (misal required field kosong)
    if (err.name === "ValidationError") {
        const fields = Object.values(err.errors).map(e => ({
            field: e.path,
            message: e.message
        }));
        return res.status(400).json({ message: "Validasi database gagal", errors: fields });
    }

    // Mongoose cast error (misal ID format salah)
    if (err.name === "CastError") {
        return res.status(400).json({ message: `Format ${err.path} tidak valid` });
    }

    // Duplicate key (misal email sudah ada)
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(409).json({ message: `${field} sudah digunakan` });
    }

    res.status(err.status || 500).json({
        message: err.message || "Terjadi kesalahan pada server"
    });
}

module.exports = errorHandler;
