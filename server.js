const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE (you already have this working)
app.get("/", (req, res) => {
    res.send("InsightHub API is running 🚀");
});
console.log("SERVER STARTED");


// 🔥 THIS IS THE IMPORTANT PART
const projectRoutes = require("./routes/projects");
app.use("/projects", projectRoutes);


// AUTH ROUTES (if you have them)
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);


// LAST LINE
app.listen(5000, () => {
    console.log("Server running on port 5000");
});