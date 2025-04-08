const mongoose = require('mongoose');//another way to interact with mongodb and allows u to create a model
//this structures the photo collection
const photoSchema = new mongoose.Schema({
  filename: String, // Assuming you store the file path or URL
  imageData: {
    data: Buffer,
    contentType: String,
  },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;