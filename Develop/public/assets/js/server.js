const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.get("/notes", (req, res) => {
    res.sendFile("C:/Users/phill/Desktop/coding-uofm/homework/homework-11/Note-Taker/Develop/public/notes.html");
});

app.get("*", (req, res) => {
    res.sendFile("C:/Users/phill/Desktop/coding-uofm/homework/homework-11/Note-Taker/Develop/public/index.html");
})

app.listen(PORT, () => {
    console.log("Server is running at http://localhost:" + PORT);
})