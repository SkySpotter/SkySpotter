var mongoose = require('mongoose');

var Input = mongoose.model('Input', {
  Latitude: {
    type: Number,
    required: true,
    minlength: 1,
  },
  Longitude: {
    type: Number,
    required: true,
    minlength: 1,
  },
  Accuracy:
  {
    type: Number,
  },
  Altitude:
  {
    type: Number,
  },
  Time: {
    type: String,
    default: new Date().toUTCString()
  },
  Roll:
  {
    type: Number,
  },
  Azimuth:
  {
    type: Number,
  },
  Pitch:
  {
    type: Number,
  },
  MagneticField_X:
  {
    type: Number,
  },
  MagneticField_Y:
  {
    type: Number,
  },
  MagneticField_Z:
  {
    type: Number,
  },
  Accelerometer_X:
  {
    type: Number,
  },
  Accelerometer_Y:
  {
    type: Number,
  },
  Accelerometer_Z:
  {
    type: Number,
  },
});

module.exports = {Input};