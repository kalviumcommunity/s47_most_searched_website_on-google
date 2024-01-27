const express = require("express")

const app = express()
const mongoose = require('mongoose')
const data ='mongodb+srv://nitinsoni:<Nitin11>@most-searched-web.cc9wsj9.mongodb.net/?retryWrites=true&w=majority'

app.get("/",(req,res)=>{
    mongoose.connect(data)
    .then(()=>{
        res.json({Connection_Status: "Connected"})
    .catch((error)=>{
        res.json({Connection_Status: "Not Connected"})
    })
})
})

app.get("/ping",(req,res)=> {
    res.json({message:'Pong'})
})

app.listen(3000,() => {
    console.log("Server is working on port 3000")
});