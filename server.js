const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);

app.get("/", (req, res) => {
    res.send("INSIGHTHUB API RUNNING");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});