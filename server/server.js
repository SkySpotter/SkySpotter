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
      Latitude: res.body.Latitude,
      Longitude: res.body.Longitude,
      Accuracy: res.body.Accuracy,
      Altitude: res.body.Altitude,
      Time: res.body.Time,
      Roll: res.body.Roll,
      Azimuth: res.body.Azimuth,
      Pitch: res.body.Pitch,
      MagneticField_X: res.body.MagneticField_X,
      MagneticField_Y: res.body.MagneticField_Y,
      MagneticField_Z: res.body.MagneticField_Z,
      Accelerometer_X: res.body.Accelerometer_X,
      Accelerometer_Y: res.body.Accelerometer_Y,
      Accelerometer_Z: res.body.Accelerometer_Z,
      
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
