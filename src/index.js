const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const projectFolder = path.join(__dirname, "..");

app.use(express.static(path.join(projectFolder, "public")));

// console.log("Project folder:", projectFolder);

app.get("/", (req, res) => {
  res.sendFile(path.join(projectFolder, "public", "index.html"));
});

app.get("/shop", (req, res) => {
  res.sendFile(path.join(projectFolder, "public", "shop.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(projectFolder, "public", "about.html"));
});
app.get("/favorite", (req, res) => {
  res.sendFile(path.join(projectFolder, "public", "Favorite.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(projectFolder, "public", "Login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(projectFolder, "public", "Register.html"));
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(projectFolder, "public", "NotFound.html"));
});
app.listen(port, () => {
  console.log(`Elgohary app listening on port ${port}`);
});
