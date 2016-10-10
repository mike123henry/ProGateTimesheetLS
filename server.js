'use strict';
//get environmant variables
require('dotenv').config();

//setup dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
var bodyParser = require('body-parser');
var twilio = require('twilio');

//import files
var Employees = require('./models/employees.js');
var ShiftEvents = require('./models/shiftEvents.js');
//var twilioRoutes = require( "./app/textMe.js");


//setup express
let app = express();
app.set('port', (process.env.PORT || 3003));
app.use(express.static('./public'));
app.use(bodyParser.json());

//setup mongo / mongoose
var uri = process.env.MONGODB_URI || 'mongodb://localhost/pgstsls';
mongoose.connect(uri);
var db = mongoose.connection;
db.on('error', function (err){
    console.log('Mongoose error:', err);
});

db.once('open', function() {
    console.log('Mongoose connection successful.');
});


//twilio stuff=======================================
var accountSid = process.env.TWILIO_SID // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_TOKEN;   // Your Auth Token from www.twilio.com/console
var fromNumber = process.env.TWILIO_FROM



//==================================================
//Main route, redirect to the react portion of the app (because of the bundle.js file)
app.get('/', (request, response) =>{
    response.sendFile(path.join(__dirname, 'public', 'index.html'));

});


//use restful ~= crud!!!!
//post employees save one/more new employees    (Crud create)
//get employees get all employees               (cRud retreive)
//put w/id update eemplpyee                     (crUd update)
//delete to delete a employee document          (cruD delete)


//=======login========================
app.post('/api/login', function(req, res){
    // req.body should contain the employee loginId
    // it is used to poll the data base employees collection and get the data needed for post /api/twilioFeed
    //it also will gate is login is correct
    Employees.findOne(req.body)
        .exec(function(err, doc){
            if(err){
                res.send("Error");
            } else if (doc) {
                res.json(doc);
            } else {
                res.send("Failed")
            }
        });

});
//===================================


//=== shiftEvents ===================================================
//post ~= create
app.post('/api/shiftEvents', function(req,res){
    var newShiftEvent = new ShiftEvents(req.body);
    newShiftEvent.save(function(err, doc){
        if(err){
            res.json(err);
        } else {
            res.json(doc);
        }
    });

});

//get ~= retreive
app.post('/api/isOnShift', function(req, res){
    ShiftEvents.findOne(req.body)
        .sort({createdAt: -1})
        .exec(function(err, doc){
            if(err){
                res.json(err);
            } else if (doc) {
                res.json(doc);
            } else {
                res.json({isOnShift: false})
            }
        });

});

//=========================================================
//=========================================================
app.post("/api/twilioFeed",  function(req,res){
    var twilio_obj = {};
    var client = new twilio.RestClient(accountSid, authToken);
    twilio_obj.body = req.body.message;
    twilio_obj.to = req.body.to;
    twilio_obj.from = process.env.TWILIO_FROM;
    client.messages.create(twilio_obj, function(err, message) {
        if(err){
          res.send(err)
        } else {
         res.send(message.sid)
        }
    });

 });
//=========================================================
app.get('/api/getEmpColl', function(req, res){
    Employees.find({})
        .exec(function(err, doc){
            if(err){
                res.json(err);
            } else {
                res.json(doc);
            }
        })
});




//start server
app.listen(app.get('port'),() => {
    console.log('Server started at: http://localhost/' + app.get('port')+'/');
});
