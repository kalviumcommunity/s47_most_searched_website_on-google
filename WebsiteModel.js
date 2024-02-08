const mongoose = require('mongoose');


const websiteSchema = new mongoose.Schema({
  
id: Number,
Website: String,
Link: String,
year: String,
Description: String,
image: String

});


const Website = mongoose.model('names', websiteSchema);

module.exports = Website;
