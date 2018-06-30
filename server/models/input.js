var mongoose = require('mongoose');

var Input = mongoose.model('Input', {
  latitude: {
    type: Number,
    required: true,
    minlength: 1,
  },
  longitude: {
    type: Number,
    required: true,
    minlength: 1,
  },
  accuracy:
  {
    type: Number,
  },
  altitude:
  {
    type: Number,
  },
  time: {
    type: String,
    default: new Date().toUTCString()
  },
  roll:
  {
    type: Number,
  },
  azimuth:
  {
    type: Number,
  },
  pitch:
  {
    type: Number,
  },
  magneticField_X:
  {
    type: Number,
  },
  magneticField_Y:
  {
    type: Number,
  },
  magneticField_Z:
  {
    type: Number,
  },
  accelerometer_X:
  {
    type: Number,
  },
  accelerometer_Y:
  {
    type: Number,
  },
  accelerometer_Z:
  {
    type: Number,
  },
});

module.exports = {Input};