const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email sudah terdaftar" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        const token = jwt.sign(
            { userId: savedUser._id },
            process.env.JWT_SECRET || "stepup-secret-key",
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message: "Register berhasil",
            token,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Error saat register",
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Pesan error sengaja sama biar attacker ga tau email mana yang terdaftar
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email atau password salah" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email atau password salah" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || "stepup-secret-key",
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login berhasil",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Error saat login",
            error: error.message
        });
    }
};
