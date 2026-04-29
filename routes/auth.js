const express = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await pool.query(
        "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *",
        [name, email, hashed]
    );

    res.json(user.rows[0]);
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
    );

    if (user.rows.length === 0) {
        return res.json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);

    if (!valid) {
        return res.json({ error: "Wrong password" });
    }

    res.json({
        user: {
            id: user.rows[0].id,
            name: user.rows[0].name,
            email: user.rows[0].email,
            role: user.rows[0].role
        }
    });
});

module.exports = router;