const express = require("express")
const route = require('./route')
const app = express()
const mongoose = require('mongoose')
const URI ='mongodb+srv://nitinsoni:Nitin@11@most-searched-web.cc9wsj9.mongodb.net/?retryWrites=true&w=majority'
// app.use('/',route)
mongoose.connect(URI,{dbName:"asap"})
.then(() =>{
    console.log("Connection successfull");
})
.catch((err) =>{
    console.log(err);
})

app.get("/", (req, res) => {
    res.send("hello")
});

app.get("/ping",(req,res)=> {
    res.json({message:'Pong'})
})

app.listen(4000,() => {
    console.log("Server is working on port 4000")
});