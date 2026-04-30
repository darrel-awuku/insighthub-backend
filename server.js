const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});