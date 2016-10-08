const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    employeename: {
        type: String,
        required: true},

    employeescreenname: {
        type: String,
        required: true},

    employeeloginid: {
        type: String,
        required: true,
        unique: true},

    employeephone: {
        type: String,
        required: true}

},{
    timestamps:true
});

const Employees = mongoose.model('Empolyees', EmployeeSchema);
module.exports = Employees;
//module.exports = george;