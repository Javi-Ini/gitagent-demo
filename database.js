const mysql = require('mysql');

// Hardcoded database credentials (security issue)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'myapp'
});

// No connection error handling (bug)
connection.connect();

// No input sanitization (security issue)
function getUserById(id) {
  const query = "SELECT * FROM users WHERE id = " + id;
  connection.query(query, (err, results) => {
    return results;
  });
}

// Callback hell (tech debt)
function getUserPosts(userId, callback) {
  connection.query("SELECT * FROM users WHERE id = " + userId, (err, user) => {
    connection.query("SELECT * FROM posts WHERE user_id = " + userId, (err, posts) => {
      connection.query("SELECT * FROM comments WHERE user_id = " + userId, (err, comments) => {
        callback(user, posts, comments);
      });
    });
  });
}

// Connection never closed (bug)
function runQuery(query) {
  connection.query(query, (err, results) => {
    if (err) throw err;
    return results;
  });
}

// Duplicate code (tech debt)
function getAdminById(id) {
  const query = "SELECT * FROM users WHERE id = " + id;
  connection.query(query, (err, results) => {
    return results;
  });
}

module.exports = { getUserById, getUserPosts, runQuery };
