var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PayperiodsSchema = new Schema({
    date: {
        type: String
    },
    weekday: {
        type: String
    },
    payperiod: {
        type: String
    },
    periodenddate: {
        type: String
    },
    periodpaydate: {
        type: String
    }
});

var Payperiods = mongoose.model('Payperiods', PayperiodsSchema);
module.exports = Payperiods;