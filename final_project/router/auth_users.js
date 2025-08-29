const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  // Filter the users array for any user with the same username and password
  let validusers = users.filter((user) => {
    return (user.username === username);
  });
  // Return true if any valid user is found, otherwise false
  if (validusers.length > 0) {
    return false;
  } else {
    return true;
  }
}

const authenticatedUser = (username, password) => { //returns boolean
  // Filter the users array for any user with the same username and password
  let validusers = users.filter((user) => {
    return (user.username === username && user.password === password);
  });
  // Return true if any valid user is found, otherwise false
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ "message": "Error loggin in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, "access", { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
    }
    return res.status(200).json({ "message": "User successfully logged in" })
  }
  else {
    return res.status(208).json({ "message": "Invalid Login. Check username and password" })
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const username = req.session.authorization["username"];
  const isbn_param = req.params.isbn;
  const book = books[isbn_param];
  book["reviews"][username] = req.body.text
  books[isbn_param] = book;
  res.status(200).json({ "message": "User " + username + " added a review to " + book["title"] });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const username = req.session.authorization["username"];
  const isbn_param = req.params.isbn;
  const book = books[isbn_param];
  if (book["reviews"][username]) {
    delete book["reviews"][username];
    books[isbn_param] = book;
    res.status(200).json({ "message": "User " + username + " deleted a review from " + book["title"] });
  }
  else {
    res.send("There is no reivew from user: " + username);
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
