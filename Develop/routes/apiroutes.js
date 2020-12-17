const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const dataBase = require("../db/db.json");
const { v4: uuidv4 } = require('uuid');
// let id = 0;

router.get("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "UTF-8", (err, dbres) => {
    if (err) throw err;
    return res.json(JSON.parse(dbres));
  });
});

// router.get("/notes/:noteId", (req, res) => {
//   let id = req.params.noteId;
//   console.log("noteId: " + id);
//   res.end();
// });



//we're getting the users notes above. now down here we need to add it (req.body) to the db.json.
router.post("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "UTF-8", (err, dbres) => {
    if (err) throw err;
    //ends the response so the promise in index.js → handleNoteSave() can execute
    res.send();
    return dbres;
  }
  );
  
  let newNote = req.body;
  newNote.id = uuidv4();
  // id++;
    console.log("POST", JSON.stringify(req.body), req.body);
    console.log(dataBase);
    
    const updatedDb = [...dataBase, req.body];
    
    console.log("updatedDb: " + JSON.stringify(updatedDb));

    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(updatedDb), (err, response) => {
            if (err) throw err;
        });

});

router.delete("/notes/:id", (req, res) => {

  console.log(req.params.id);
  const noteId = req.params.id;
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, response) => {
    if (err) throw err;
    const resp = JSON.parse(response);
    // console.log(resp[0].noteId);
    for(let i = 0; i < resp.length; i++) {
      console.log("resp[i]: " + JSON.stringify(resp[i]));
      console.log("resp[i].id: " + resp[i].id);
      console.log("noteId: " + noteId);
      if (resp[i].id === noteId) {
        resp.splice(resp[i], 1);
      }
    }
  });
});

module.exports = router;
