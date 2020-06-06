var mongoose = require('mongoose');


var addanonymousschema = new mongoose.Schema({
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

var anonymous = mongoose.model('anonymous', addanonymousschema);
module.exports = anonymous;
