const express = require("express");
const router = express.Router();
const pool = require("../db");

// CREATE PROJECT
router.post("/create", async (req, res) => {
    const {
        title,
        abstract,
        department,
        supervisor,
        year,
        file_url,
        video_link,
        user_id
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO projects 
            (title, abstract, department, supervisor, year, file_url, video_link, status, user_id)
            VALUES ($1,$2,$3,$4,$5,$6,$7,'pending',$8)
            RETURNING *`,
            [title, abstract, department, supervisor, year, file_url, video_link, user_id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.json({ error: err.message });
    }
});


// GET APPROVED PROJECTS
router.get("/", async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM projects WHERE status='approved'"
    );
    res.json(result.rows);
});


// GET PENDING PROJECTS
router.get("/pending", async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM projects WHERE status='pending'"
    );
    res.json(result.rows);
});


// APPROVE PROJECT
router.put("/approve/:id", async (req, res) => {
    const { id } = req.params;

    await pool.query(
        "UPDATE projects SET status='approved' WHERE id=$1",
        [id]
    );

    res.json({ message: "Project approved" });
});


// REJECT PROJECT
router.put("/reject/:id", async (req, res) => {
    const { id } = req.params;

    await pool.query(
        "UPDATE projects SET status='rejected' WHERE id=$1",
        [id]
    );

    res.json({ message: "Project rejected" });
});
console.log("PROJECT ROUTES FILE LOADED");

module.exports = router;