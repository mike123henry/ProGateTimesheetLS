/*Include the Axios library for HTTP requests*/
var axios = require('axios');

// Helper Functions (in this case the only one is runQuery)
var helpers = {

    // This will run our query.
    saveNewEmployee: function(signUpData){
        console.log("helpers signUpData", signUpData)
        return axios.post('/api/employees', signUpData)
            .then(function(results){
                //console.log("axios post /api/employees", results._id);
                return results._id;
            })
    },
    saveNewShift: function(shiftData){
        //console.log("helpers saveNewShift", shiftData)
        return axios.post('/api/shiftEvents', shiftData)
            .then(function(results){
                console.log("saveNewShift axios  post /api/shiftEvents results.data", results.data);
                return results.data;
            })
    },
    getInitialShift: function(employeeId){
               console.log("helpers getInitialShift employeeId = ", employeeId)
        return axios.post('/api/isOnShift', employeeId)
            .then(function(results){
                console.log("axios /api/shiftEvents results", results.data);
                return results.data;
            })
    },
    sendText: function(message){
        console.log("helpers sendText message = ", message);
        return axios.post('/twilioFeed', message)
            // .then(function(results){
            //     console.log("axios /twilioFeed results", results.data);
            //     return results.data;
           // });
    },
    getLogin: function(loginId){
        console.log("helpers getLogin loginId = ", loginId);
        return axios.post('/api/login', loginId)
            // .then(function(results){
            //     console.log("axios /twilioFeed results", results.data);
            //     return results.data;
           // });
    }
}

module.exports = helpers
