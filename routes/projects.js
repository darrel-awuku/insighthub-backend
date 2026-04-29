const express = require("express");
const pool = require("../db");

const router = express.Router();

router.post("/create", async (req, res) => {
    const {
        title, abstract, department,
        supervisor, year,
        file_url, video_link, user_id
    } = req.body;

    const result = await pool.query(
        `INSERT INTO projects 
        (title,abstract,department,supervisor,year,file_url,video_link,user_id)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING *`,
        [title, abstract, department, supervisor, year, file_url, video_link, user_id]
    );

    res.json(result.rows[0]);
});

router.get("/", async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM projects WHERE status='approved'"
    );

    res.json(result.rows);
});

router.get("/pending", async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM projects WHERE status='pending'"
    );

    res.json(result.rows);
});

router.put("/approve/:id", async (req, res) => {
    const result = await pool.query(
        "UPDATE projects SET status='approved' WHERE id=$1 RETURNING *",
        [req.params.id]
    );

    res.json(result.rows[0]);
});

module.exports = router;