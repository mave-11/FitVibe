const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const session = require("express-session");

const projectFolder = process.cwd();
// Import routes
const authRoutes = require("./routes/auth");

console.log("Project folder:", projectFolder);

app.use(express.static(path.join(projectFolder, "public")));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get("/session", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.json({ user: null });
  }
});

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
