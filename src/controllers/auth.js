const bcrypt = require("bcrypt");
const path = require("path");
const pool = require("../db/db");
const projectFolder = process.cwd();
// Register Controller

// register controller
const register = async (req, res) => {
  if (req.method === "GET") {
    return res.sendFile(path.join(projectFolder, "public", "Register.html"));
  }

  try {
    console.log("Registering user:", req.body);
    const { first_name, last_name, email, password, phone, gender } = req.body;

    // if (first_name || !last_name || !email || !password || !phone || !gender) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password, phone, gender, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *",
      [first_name, last_name, email, hashedPassword, phone, gender]
    );

    console.log("User registered successfully:", newUser.rows[0]);

    res.redirect("auth/login");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  if (req.method === "GET") {
    return res.sendFile(path.join(projectFolder, "public", "Login.html"));
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    req.session.user = {
      id: user.id,
      first_name: user.first_name,
      email: user.email,
    };
    res.redirect("/");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    res.redirect("/");
  });
};

module.exports = {
  register,
  login,
  logout,
};
