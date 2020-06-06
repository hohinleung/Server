var mongoose = require('mongoose');


var addpostschema = new mongoose.Schema({
  Text: {
    type: String,
    required: true,
  },
  date:{
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  }
});




var comment = mongoose.model('comment', addpostschema);
module.exports = comment;
