const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  Website: {
    type: String,
    required: [true, 'Website name is required'],
    trim: true
  },
  Link: {
    type: String,
    required: [true, 'Website link is required'],
    trim: true,
    match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, 'Please fill a valid website address']
  },
  year: {
    type: String,
    trim: true
  },
  Description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  image: {
    type: String,
    trim: true
  }
});

const Website = mongoose.model('names', websiteSchema);

module.exports = Website;
