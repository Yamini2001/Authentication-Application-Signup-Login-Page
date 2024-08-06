const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.signUp = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, username, password) VALUES (?, ?, ?)',
      [name, username, hashedPassword]
    );
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).send('Error in creating user');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];
    if (!user) return res.status(404).send('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Error in login');
  }
};

exports.forgotPassword = async (req, res) => {
  const { username } = req.body;
  // Implement password reset logic here
  res.status(200).send('Password reset link sent');
};
