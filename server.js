'use strict';
//setup dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
var bodyParser = require('body-parser');

//import files
var Employees = require('./models/employees.js');




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



//Main route, redirect to the react portion of the app (because of the bundle.js file)
app.get('/', (request, response) =>{
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//use restful//crud!!!!
//get employees get all employees
//post employees save one/more new employees
//put w/id update eemplpyee
////delete to delete a employee document

//======signUp ==== crud section ==================================
app.get('/api/getSignUp', function(req, res){
    console.log('there is not a get for this route');
});

app.post('/api/getSignUp', function(req,res){
    console.log('req.body',req.body)
    var newEmployee = new Employees(req.body);
    console.log('req.body',req.body)

    newEmployee.save(function(err, doc){
        if(err){
            console.log(err);
        } else {
            res.send(doc._id);
        }
    });
})



//================================================================
app.get('/api/getEmpColl', function(req, res){
    console.log('server.js has run /api/getEmpColl')
    Employees.find({})
        .exec(function(err, doc){
            if(err){
                console.log('server.js /api/getEmpColl has errored', err);
            } else {
                console.log('server.js /api/getEmpColl doc =',doc)
                res.json(doc);
            }
        })
});




//start server
app.listen(app.get('port'),() => {
    console.log('Server started at: http://localhost/' + app.get('port')+'/');
});
