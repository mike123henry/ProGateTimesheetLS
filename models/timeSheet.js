const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;

const TimeSheetSchema = new Schema({
    time : {
        type : Date,
        default: Date.now },
    employeeName: {
        type: String
    }
});

const TimeSheet = mongoose.model('TimeSheet', TimeSheetSchema);
module.exports = TimeSheet;