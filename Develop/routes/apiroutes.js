const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const dataBase = require("../db/db.json");

router.get("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "UTF-8", (err, dbres) => {
    if (err) throw err;
    // console.log("dbres ln 9: " + dbres);
    return res.json(JSON.parse(dbres));
  });
});

// router.get("/notes/:noteId", (req, res) => {
//   console.log(req.params.noteId)
// })



//we're getting the users notes above. now down here we need to add it (req.body) to the db.json.
router.post("/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "UTF-8", (err, dbres) => {
        if (err) throw err;
        console.log("dbres ln 19: " + dbres);
        //ends the response so the promise in index.js → handleNoteSave() can execute
        res.send();
        return dbres;
    }
    );

    console.log("POST", JSON.stringify(req.body), req.body);
    console.log(dataBase);
    
    const updatedDb = [...dataBase, req.body];
    
    console.log("updatedDb: " + JSON.stringify(updatedDb));

    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(updatedDb), (err, response) => {
            if (err) throw err;
        });

});

module.exports = router;
