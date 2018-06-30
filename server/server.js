const express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/postInput', (req, res) => {
    var input = new Input({
      lng: req.body.lng,
      lat : req.body.lat,
      time : req.body.time,
      deviceId : req.body.deviceId,
    });
  
    input.save().then((doc) => 
    {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });


  app.get('/getInputs', (req, res) => {
    input.find().then((inputs) => {
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
