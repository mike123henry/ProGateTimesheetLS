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

//======signUp ==== restful ~= crud section ==================================
//post ~= create
app.post('/api/employees', function(req,res){
    console.log('server.js has run post  /api/getSignUp');
    console.log('req.body',req.body);
    var newEmployee = new Employees(req.body);

    newEmployee.save(function(err, doc){
        if(err){
            console.log(err);
        } else {
            res.send(doc._id);
        }
    });

});

//get ~= retreive
app.get('/api/employees', function(req, res){
    //console.log('server.js has run get /api/employees')
    Employees.find({})
        .exec(function(err, doc){
            if(err){
                console.log('server.js get /api/employees has errored', err);
            } else {
                //console.log('server.js get /api/getSignUp doc =',doc)
                res.json(doc);
            }
        })

});

//put ~= update

//=======login========================
app.post('/api/login', function(req, res){
    // req.body should contain the employee loginId
    // it is used to poll the data base employees collection and get the data needed for post /api/twilioFeed
    //it also will gate is login is correct
    console.log('server.js has run post /api/login req.body = ', req.body);
    Employees.findOne(req.body)
        .exec(function(err, doc){
            if(err){
                console.log('server.js post /api/login has errored', err);
                res.send("Error");
            } else if (doc) {
                console.log('server.js post /api/login doc =',doc);
                // console.log('server.js post /api/login doc.employeephone =',doc.employeephone);
                // twilio_obj.to = "+1"+doc.employeephone ;
                // console.log('server.js post /api/login twilio_obj =',twilio_obj);
                res.json(doc);
            } else {
                console.log('server.js post /api/login ran else -- doc = ', doc );
                res.send("Failed")
            }
        });

});
//===================================


//=== shiftEvents ===================================================
//post ~= create
app.post('/api/shiftEvents', function(req,res){
    console.log('server.js has run post  /api/shiftEvents');
    console.log('post  /api/shiftEvents req.body = ',req.body);
    var newShiftEvent = new ShiftEvents(req.body);
    newShiftEvent.save(function(err, doc){
        if(err){
            console.log('newShiftEvent.save errored', err);
            res.json(err);
        } else {
            console.log('newShiftEvent.save doc', doc);
            res.json(doc);
        }
    });

});

//get ~= retreive
app.post('/api/isOnShift', function(req, res){
    console.log('server.js has run post /api/isOnShift req.body = ', req.body);
    ShiftEvents.findOne(req.body)
        .sort({createdAt: -1})
        .exec(function(err, doc){
            if(err){
                console.log('server.js post /api/isOnShift has errored', err);
                res.json(err);
            } else if (doc) {
                console.log('server.js post /api/isOnShift doc =',doc);
                console.log('server.js post /api/isOnShift doc.isOnShift =',doc.isOnShift);
                res.json(doc);
            } else {
                console.log('server.js post /api/isOnShift ran else -- doc = ', doc );
                res.json({isOnShift: false})
            }
        });

});

//=========================================================
//=========================================================
app.post("/api/twilioFeed",  function(req,res){
    var twilio_obj = {};
    var client = new twilio.RestClient(accountSid, authToken);
    console.log('server.js twilio has posted');
    //console.log('req = ',req);
    console.log('server.js post twilioFeed" req.body = ',req.body);
    console.log('server.js post twilioFeed" req.body.message = ',req.body.message);
    twilio_obj.body = req.body.message;
    twilio_obj.to = req.body.to;
    twilio_obj.from = process.env.TWILIO_FROM;
    console.log('twilio_obj = ',twilio_obj);
    client.messages.create(twilio_obj, function(err, message) {
        if(err){
          console.log(err)
          res.send(err)
        } else {
         console.log(message.sid);
         res.send(message.sid)
        }
    });

 });
//=========================================================
app.get('/api/getEmpColl', function(req, res){
    //console.log('server.js has run get /api/getEmpColl')
    Employees.find({})
        .exec(function(err, doc){
            if(err){
                console.log('server.js /api/getEmpColl has errored', err);
                res.json(err);
            } else {
                //console.log('server.js /api/getEmpColl doc =',doc)
                res.json(doc);
            }
        })
});




//start server
app.listen(app.get('port'),() => {
    console.log('Server started at: http://localhost/' + app.get('port')+'/');
});
