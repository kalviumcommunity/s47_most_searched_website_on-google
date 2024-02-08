const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Website = require('./WebsiteModel'); 
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

app.get("/", (req, res) => {
    Website.find({})
    .then(data => {
        res.json(data);
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error fetching data');
    });
});

app.get("/ping", (req, res) => {
    res.json({ message: 'Pong' });
});

app.listen(4000, () => {
    console.log("Server is working on port 4000");
});
