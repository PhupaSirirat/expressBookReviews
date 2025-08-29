# 📚 Online Book Review Application

## Overview
This lab is a **server-side online book review application** built with **Node.js + Express.js**.  
It integrates a **secure REST API** using **JWT-based authentication** and has been tested with **Postman** and **Axios** using both **Promise callbacks** and **Async-Await**.

## Features
- JWT session-level authentication
- Public and protected REST API endpoints
- Manage books and reviews (view, add, update, delete)
- Tested with Postman and Axios (Promises / Async-Await)

## Installation
```bash
npm install
npm start
```

Server runs at: **http://localhost:5000**

## API Endpoints
- `GET /` → Get all books
- `GET /isbn/:isbn` → Get book by ISBN
- `GET /author/:author` → Get books by author
- `GET /title/:title` → Get books by title
- `POST /register` → Register user
- `POST /login` → Login & get JWT
- `POST /auth/review/:isbn` → Add/Update review (JWT required)
- `DELETE /auth/review/:isbn` → Delete review (JWT required)

## Testing
- Use **Postman** to test API routes  
- Or test with **Axios** in Node.js:
```js
const axios = require('axios');

// Async-Await
async function getBooks() {
  const res = await axios.get('http://localhost:5000/');
  console.log(res.data);
}
getBooks();

// Promise callbacks
axios.get('http://localhost:5000/')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

## Tech Stack
- Node.js + Express.js
- JWT (jsonwebtoken)
- Axios
- Postman
