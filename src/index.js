const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const projectFolder = path.join(__dirname, "..");
// Import routes
const authRoutes = require("./routes/auth");

app.use(express.static(path.join(projectFolder, "public")));
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

// console.log("Project folder:", projectFolder);

// Use routes
app.use("/auth", authRoutes);

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

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(projectFolder, "public", "NotFound.html"));
});
app.listen(port, () => {
  console.log(`Elgohary app listening on port ${port}`);
});
