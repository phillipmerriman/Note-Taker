const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../public/index.html"));
});

app.listen(PORT, () => {
    console.log("Server is running at http://localhost:" + PORT);
});