var mongoose = require('mongoose');


var factSchema = new mongoose.Schema({
  text: String
}, {
  timestamps: true
});

var creatorSchema = new mongoose.Schema({
  Creator: String,
  Title: String,
  MediaType: String,
  Website: String,
  Date: String,
  Description: [factSchema],
  googleId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Creator', creatorSchema);
