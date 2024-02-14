//server.js
//mongodb+srv://nitinsoni:Nitin@cluster0.nsd72yp.mongodb.net/?retryWrites=true&w=majority'

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const route = require('./route')
const cors = require('cors');
app.use(express.json())
app.use(cors());

const URI = 'mongodb+srv://nitinsoni:Nitin@cluster0.nsd72yp.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(URI, { dbName: "websites" })
    .then(() => {
        console.log("Connection successful");

    })
    .catch((err) => {
        console.log(err.message);
    });

app.use('/',route)
app.get("/ping", (req, res) => {
    res.json({ message: 'Pong' });
});

app.listen(4000, () => {
    console.log("Server is working on port 4000");
});