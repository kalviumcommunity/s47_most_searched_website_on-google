const express = require('express');
const mongoose = require('mongoose'); 
const jwt = require('jsonwebtoken')
const Website = require('./WebsiteModel');
const cookieParser = require('cookie-parser'); // Ensure cookie-parser is required

const route = express.Router();

// Ensure the routeruses cookie-parser middlewarroute.use(cookieParser());

route.use(express.json());

route.get('/', (req, res) => {
  Website.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error("Error fetching data:", err);
      res.status(500).send('Error fetching data');
    });
});

route.post('/', (req, res) => {
  Website.create(req.body)
    .then(newWebsite => {
      res.status(201).json(newWebsite);
    })
    .catch(err => {
      console.error("Error creating document:", err);
      res.status(500).send(err.message);
    });
});

route.put('/:id', (req, res) => {
  const { id } = req.params; 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID format');
  }

  Website.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedWebsite => {
      if (!updatedWebsite) {
        return res.status(404).send('Website not found');
      }
      res.json(updatedWebsite);
    })
    .catch(err => {
      console.error("Error updating document:", err);
      res.status(500).send(err.message);
    });
});

route.post('/login',(req,res)=>{
  const secret = "Nitin"
  const token = jwt.sign({data:req.body},secret,{expiresIn:100000000})
  res.json(token)
})

route.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID format');
  }

  Website.findByIdAndDelete(id)
    .then(deletedWebsite => {
      if (!deletedWebsite) {
        return res.status(404).send('Website not found');
      }
      res.json({ message: 'Website deleted successfully' });


    })
    .catch(err => {
      console.error("Error deleting document:", err);
      res.status(500).send(err.message);
    });
});


// Assuming you are using Express.js
route.get('/api/categories', async (req, res) => {
    try {
        const categories = await db.query("SELECT * FROM categories");
        res.json(categories.rows);
    } catch (error) {
        res.status(500).send("Server error");
    }
});


module.exports = route;
