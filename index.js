//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

var userAuthorised = false;

function logger(req, res, next) {
  if (req.body.password == "ILoveProgramming") {
    userAuthorised = true;
  }
  next();
}

app.use(logger);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (userAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    // res.sendFile(__dirname + "/public/index.html");
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
