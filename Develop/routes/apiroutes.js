const router = require("express").Router();
const fs = require("fs");
const path = require("path");

router.get("/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "UTF-8", (err, dbres) => {
        if (err) throw err;
        console.log(dbres);
        return res.json(JSON.parse(dbres));
    });
});

router.post("/notes", async (req, res) => {
    const prevDb = await fs.readFile(path.join(__dirname, "../db/db.json"), "UTF-8", (err, dbres) => {
        if (err) throw err;
        console.log(dbres);
        return dbres;
    });
    console.log(JSON.parse(prevDb));

    JSON.parse(prevDb).push(JSON.stringify(req.body));
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
   fs.writeFile(path.join(__dirname, "../db/db.json"), prevDb, "UTF-8", (err, response) => {
    if (err) throw err;
    console.log(JSON.stringify(req.body));
    console.log(response);
    return res.json(prevDb);
   });
});


module.exports = router;