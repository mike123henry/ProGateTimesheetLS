'use strict';

//setup express
const express = require('express');
let app = express();
app.set('port', process.env.PORT || 3001);
app.use(express.static('./public'));

//Main route, redirect to the react portion of the app (because of the bundle.js file)
app.get('/', (request, response) =>{
    response.sendFile('./public/index.html');
});






//start server
app.listen(app.get('port'),() => {
    console.log('Server started at: http://localhost/' + app.get('port')+'/');
});
