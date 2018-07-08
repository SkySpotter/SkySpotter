const express = require('express');
var bodyParser = require('body-parser');
const calc = require("./math/calc");

var {mongoose} = require('./db/mongoose');

var ObjectID = require('mongodb').ObjectID;

var {Input} = require('./models/input');
var {Event} = require('./models/event');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());

app.post('/postinput', (req, res) => {
    var input = new Input({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      accuracy: req.body.accuracy,
      altitude: req.body.altitude,
      time: req.body.time,
      rollDegree: req.body.rollDegree,
      azimuthDegree: req.body.azimuthDegree,
      pitchDegree: req.body.pitchDegree,
      azimuthRadian: req.body.azimuthRadian,
      pitchRadian: req.body.pitchRadian,
      rollRadian: req.body.rollRadian,
      magneticField_X: req.body.magneticField_X,
      magneticField_Y: req.body.magneticField_Y,
      magneticField_Z: req.body.magneticField_Z,
      accelerometer_X: req.body.accelerometer_X,
      accelerometer_Y: req.body.accelerometer_Y,
      accelerometer_Z: req.body.accelerometer_Z,
      hasMagnetometerData: req.body.hasMagnetometerData,
      hasAccelerometerData: req.body.hasAccelerometerData,
      image: req.body.image,
      imageWidth: req.body.imageWidth,
      orientation_z: req.body.orientation_z,
      orientation_y: req.body.orientation_y,
      orientation_x: req.body.orientation_x,
      orientation_w: req.body.orientation_w,
      agularVelocity_Z: req.body.agularVelocity_Z,
      angularVelocity_Y: req.body.angularVelocity_Y,
      angularVelocity_X: req.body.angularVelocity_X,
      
    });

  
    var timestamp = new Date(Date.now() - 1 * 5 * 60 * 1000);
    
    var hexSeconds = Math.floor(timestamp/1000).toString(16);

    var constructedObjectId = ObjectID(hexSeconds + "0000000000000000");

    Input.find({
      "_id": { "$gt" : constructedObjectId }
      }).then((inputs) =>
      {
        if(inputs.length > 1)
        {
          var firstInput = inputs[0];

          var secondInput = inputs[1];

          var geoLocation = calc.triangulate(firstInput.latitude, firstInput.longitude, firstInput.altitude, secondInput.latitude,
            secondInput.longitude, secondInput.altitude, firstInput.azimuthRadian, firstInput.pitchRadian,
            secondInput.azimuthRadian, secondInput.pitchRadian);

            try {
              var eve = new Event(
              {
               latitude :geoLocation[0],
               longitude : geoLocation[1],
       
              } );
       
              eve.save();
              
             } catch (error) {
               
             }
        }

   

      });    
  
    input.save().then((doc) => 
    {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });


  app.get('/getInputs', (req, res) => {
    Input.find().then((inputs) => {
      res.send({inputs});
    }, (e) => {
      res.status(400).send(e);
    });
  });

  app.get('/getevents', (req, res) => {
    Event.find().then((events) => {
      res.send({events});
    }, (e) => {
      res.status(400).send(e);
    });
  });



app.listen(port, ()=>
{
    console.log(`Server is up on port ${port}`);
});
