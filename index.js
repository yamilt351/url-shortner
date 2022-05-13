import ("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
var validUrl = require("valid-url");

// Basic Configuration
const port = process.env.PORT || 3000;
let cont = 0;
var shortendUrls = {};

//midleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.post("/api/shorturl", (req, res) => {
  const url = req.body.url;
  if (!validUrl.isHttpsUri(url)) {
    res.send({ error: "invalid url" });
    return;
  }
  cont += 1;
  shortendUrls[cont] = url;
  console.log(req.protocol);
  console.log(shortendUrls);
  res.send({
    original_url: url,
    short_url: cont,
  });
  console.log(url);
});

app.get("/api/shorturl/:id", (req, res) => {
  const id = req.params.id;
  const url = shortendUrls[id];
  res.redirect(url);
});

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
