var mongoose = require('mongoose');

var Input = mongoose.model('Input', {
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
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
  rollDegree:
  {
    type: Number,
  },
  azimuthDegree:
  {
    type: Number,
  },
  pitchDegree:
  {
    type: Number,
  },
  rollRadian:
  {
    type: Number,
  },
  azimuthRadian:
  {
    type: Number,
  },
  pitchRadian:
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
  hasMagnetometerData:
  {
    type:Boolean
  },
  hasAccelerometerData:
  {
    type:Boolean
  },
  image:
  {

  },
  imageHeight:
  {
    type:Number,
  },
  imageWidth:
  {
    type:Number
  },
  orientation_z:
  {
    type:Number,
  },
  orientation_y:
  {
    type:Number,
  },
  orientation_x:
  {
    type:Number,
  },
  orientation_w:
  {
    type:Number,
  },
  agularVelocity_Z:
  {
    type:Number
  },
  angularVelocity_Y:
  {
    type:Number
  },
  angularVelocity_X:
  {
    type:Number
  },
});

module.exports = {Input};