const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/projects", require("./routes/projects"));
app.use("/auth", require("./routes/auth"));


app.get("/", (req, res) => {
    res.send("InsightHub API is running 🚀");
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});