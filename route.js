const express = require('express');
const mongoose = require('mongoose'); 
const Website = require('./WebsiteModel'); 

const route = express.Router();


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

module.exports = route;
