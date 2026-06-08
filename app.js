
// GITAGENT FIX SUGGESTION:
// Issue: SQL injection vulnerability
// Fix: Use parameterized queries or escape user input
const express = require('express');
const app = express();
const mysql = require('mysql');

// Hardcoded credentials (security issue)
const DB_PASSWORD = "admin123";
const API_SECRET = "supersecretkey123";

// No input validation (security issue)
app.get('/user', (req, res) => {
  const userId = req.query.id;
  const query = "SELECT * FROM users WHERE id = " + userId; // SQL injection vulnerability
  
  connection.query(query, (err, results) => {
    res.send(results);
  });
});

// No error handling (bug)
app.get('/data', (req, res) => {
  const data = fetchData();
  res.json(data);
});

// Inefficient loop (tech debt)
function processUsers(users) {
  let result = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (users[i].id == users[j].id) { // == instead of === (bug)
        result.push(users[i]);
      }
    }
  }
  return result;
}

// Unused variables (tech debt)
const unusedVariable = "I do nothing";
const anotherUnused = 42;

app.listen(3000);
