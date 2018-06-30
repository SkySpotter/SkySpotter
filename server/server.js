const express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

var {Input} = require('./models/input');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/postinput', (req, res) => {
  console.log("post");
    var input = new Input({
      latitude: res.body.latitude,
      longitude: res.body.longitude,
      accuracy: res.body.accuracy,
      altitude: res.body.altitude,
      time: res.body.time,
      roll: res.body.roll,
      azimuth: res.body.azimuth,
      pitch: res.body.pitch,
      magneticField_X: res.body.magneticField_X,
      magneticField_Y: res.body.magneticField_Y,
      magneticField_Z: res.body.magneticField_Z,
      accelerometer_X: res.body.accelerometer_X,
      accelerometer_Y: res.body.accelerometer_Y,
      accelerometer_Z: res.body.accelerometer_Z,
      
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
    var id = req.params.id;
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    Todo.findById(id).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    });
  });



app.listen(port, ()=>
{
    console.log(`Server is up on port ${port}`);
});
