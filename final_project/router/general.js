const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) {
      users.push({
        "username": username,
        "password": password
      });
      return res.status(200).json({ "message": "User successfully registered. Now you can login" });
    }
    else {
      return res.status(404).json({ "message": "User already exists" });
    }
  }
  else {
    return res.status(404).json({ "message": "Unable to register user" })
  }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

const based_url = "https://phupasirirat-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/"
async function getBooks() {
  try {
    const response = await axios.get(based_url);
    console.log("Books available in the shop:");
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching book list:", error.message);
  }
}
// getBooks();

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn_param = req.params.isbn;
  res.send(books[isbn_param]);
});

async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(based_url + '/isbn/' + isbn);
    console.log(response.data);
  }
  catch (error) {
    console.error("Error fetching book by ISBN: ", error.message);
  }
}
// getBookByISBN(1)


// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author_param = req.params.author;
  const keys = Object.keys(books);
  for (var i = 0; i < keys.length; i++) {
    let book = books[keys[i]];
    if (book["author"] === author_param) {
      res.send(book);
      break;
    }
  }
});

async function getBookByAuthor(author) {
  try {
    const response = await axios.get(based_url + "/author/" + author);
    console.log(response.data)
  }
  catch (error) {
    console.error("Error fetching book by author: ", error.message)
  }
}
// getBookByAuthor("Dante Alighieri")

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title_param = req.params.title;
  const keys = Object.keys(books);
  for (var i = 0; i < keys.length; i++) {
    let book = books[keys[i]];
    if (book["title"] === title_param) {
      res.send(book);
      break;
    }
  }
});

async function getBookByTitle(title) {
  try {
    const response = await axios.get(based_url + "/title/" + title);
    console.log(response.data)
  }
  catch (error) {
    console.log("Error fetching book by title: ", error.message)
  }
}
// getBookByTitle("One Thousand and One Nights")

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn_param = req.params.isbn;
  const book = books[isbn_param];
  res.send(book["reviews"]);
});

module.exports.general = public_users;
