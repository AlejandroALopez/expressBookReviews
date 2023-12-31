const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    let booksPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(books);
        }, 100)
    });

    booksPromise.then((data) => {
        res.send(JSON.stringify(data, null, 4));
    })

    booksPromise.catch((error) => {
        res.status(500).send('Error getting books');
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    let booksPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(books[isbn]);
        }, 100)
    });

    booksPromise.then((data) => {
        res.send(data);
    })

    booksPromise.catch((error) => {
        res.status(500).send('Error getting books');
    });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    let booksPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            let keys = Object.keys(books);
            keys.forEach((key) => {
                if (books[key].author === author) {
                    resolve(books[key]);
                    return;
                }
            })
        }, 100)
    });

    booksPromise.then((data) => {
        res.send(data);
    })

    booksPromise.catch((error) => {
        res.status(500).send('Error getting books');
    });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    let booksPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            let keys = Object.keys(books);
            keys.forEach((key) => {
                if (books[key].title === title) {
                    resolve(books[key]);
                    return;
                }
            })
        }, 100)
    });

    booksPromise.then((data) => {
        res.send(data);
    })

    booksPromise.catch((error) => {
        res.status(500).send('Error getting books');
    });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
