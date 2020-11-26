const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(__dirname + "/db/db.json" )
});

app.post("/api/notes", function (req, res){
    newNote = req.body

    fs.readFile(__dirname + "/db/db.json", (err, data) => {
        let parsed = JSON.parse(data)

        parsed.push(newNote)

        fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(parsed))
    })
})

app.get("*", function (req, res) {
  res.sendFile((__dirname + "/public/index.html"));
});

app.listen(PORT, function () {
  console.log("App is listening on PORT: " + PORT);
});
