const express = require('express')
const data = require('./Data.json')
const route = express()
route.use(express.json())

route.get('/',(req,res)=>(
    res.json({Data:data})
)
)
route.post('/',(req,res)=>{
    const NewData = req.body
    data.push(NewData)
    res.json(NewData)
})
route.put('/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const update = req.body
    data[id] = update
    res.json(data)
})

route.delete('/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    data.splice(id,1)
    res.json(data)
})

module.exports = route