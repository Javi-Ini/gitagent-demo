const jwt = require('jsonwebtoken');
const users = require('./users');

// Hardcoded secret key (security issue)
const SECRET = "abc123";

// No expiration on token (security issue)
function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, SECRET);
}

// Admin check done wrong (bug)
function isAdmin(user) {
  if (user.role == "admin") { // == instead of ===
    return true;
  }
}

// Password stored in plain text (security issue)
function saveUser(username, password) {
  users.push({ username: username, password: password });
}

// No rate limiting on login (security issue)
function login(username, password) {
  for (var i = 0; i < users.length; i++) { // var instead of let/const (tech debt)
    if (users[i].username == username && users[i].password == password) {
      return generateToken(users[i]);
    }
  }
  return null;
}

// Dead code (tech debt)
function oldLoginMethod(user) {
  // This was the old way, keeping just in case
  return user.id + "_" + Date.now();
}

module.exports = { generateToken, isAdmin, login, saveUser };
