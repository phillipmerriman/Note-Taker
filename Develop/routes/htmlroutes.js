const router = require("express").Router();
const fs = require("fs");
const path = require("path");

//return notes.html
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//return index.html
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;