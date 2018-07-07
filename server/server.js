const express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

var {Input} = require('./models/input');
var {Event} = require('./models/event');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
app.use(express.bodyParser({limit: '50mb'}));
app.use(bodyParser.json());

app.post('/postinput', (req, res) => {
  console.log("post");
  console.log("post", req);
  console.log("post", req.body);
    var input = new Input({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      accuracy: req.body.accuracy,
      altitude: req.body.altitude,
      time: req.body.time,
      roll: req.body.roll,
      azimuth: req.body.azimuth,
      pitch: req.body.pitch,
      magneticField_X: req.body.magneticField_X,
      magneticField_Y: req.body.magneticField_Y,
      magneticField_Z: req.body.magneticField_Z,
      accelerometer_X: req.body.accelerometer_X,
      accelerometer_Y: req.body.accelerometer_Y,
      accelerometer_Z: req.body.accelerometer_Z,
      
    });

    var event = new Event({
      latitude : req.body.latitude,
      longitude: req.body.longitude,
      time: req.body.time,
      fake: true,
    });
    event.save();
  
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
