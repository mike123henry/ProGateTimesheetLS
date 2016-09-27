'use strict';
//setup dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

//import files
var Employees = require('./models/employees.js');

//setup express
let app = express();
app.set('port', (process.env.PORT || 3003));
app.use(express.static('./public'));

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
