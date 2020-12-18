const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const dataBase = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");

router.get("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "UTF-8", (err, dbres) => {
    if (err) throw err;
    return res.json(JSON.parse(dbres));
  });
});

//we're getting the users notes above. now down here we need to add it (req.body) to the db.json.
router.post("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "UTF-8", (err, dbres) => {
    if (err) throw err;
    //ends the response so the promise in index.js → handleNoteSave() can execute
    res.send();
    return dbres;
  });

  let newNote = req.body;
  newNote.id = uuidv4();

  const updatedDb = [...dataBase, req.body];

  fs.writeFile(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(updatedDb),
    (err, response) => {
      if (err) throw err;
    }
  );
});

router.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, response) => {
    if (err) throw err;
    const resp = JSON.parse(response);

    for (let i = 0; i < resp.length; i++) {
      if (resp[i].id === noteId) {
        console.log(resp[i]);
        resp.splice(i, 1);

        return res.send(
          fs.writeFile(
            path.join(__dirname, "../db/db.json"),
            JSON.stringify(resp),
            (err, response) => {
              if (err) throw err;
            }
          )
        );
      }
    }
  });
});

module.exports = router;