const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { name, email, password, role = "student", language = "en" } = req.body;
    const hashedPw = await bcrypt.hash(password, 10);

    const user = await createUser({ name, email, password: hashedPw, role, language });
    res.status(201).json({ message: "Registered successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "User registration failed." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.json({ message: "Login successful", token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed." });
  }
};

module.exports = { register, login };