var mongoose = require('mongoose');

var Event = mongoose.model('Event', {
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  time: {
    type: String,
    default: new Date().toUTCString()
  },
  fake:
  {
      type:Boolean,
      default:false,
  }
});

module.exports = {Event};