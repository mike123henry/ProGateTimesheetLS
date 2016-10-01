const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;

const ShiftEventSchema = new Schema({
    time : {
        type : Date,
        default: Date.now },
    employeename: {
        type: String},
    isOnShift: {
        type: Boolean},
    geolat: {
        type: Number},
    geolng:{
        type: Number}
});

const ShiftEvent = mongoose.model('ShiftEvent', ShiftEventSchema);
module.exports = ShiftEvent;


