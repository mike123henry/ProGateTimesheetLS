/*Include the Axios library for HTTP requests*/
var axios = require('axios');

// Helper Functions (in this case the only one is runQuery)
var helpers = {

    // This will run our query.
    saveNewEmployee: function(signUpData){
        console.log("helpers signUpData", signUpData)
        return axios.post('/api/employees', signUpData)
            .then(function(results){
                console.log("axios results", results._id);
                return results._id;
            })
    },
    saveNewShift: function(shiftData){
        console.log("helpers saveNewShift", shiftData)
        return axios.post('/api/shifties', shiftData)
            .then(function(results){
                console.log("axios results", results._id);
                return results._id;
            })
    }
}

module.exports = helpers
