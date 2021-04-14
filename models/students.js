const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentsSchema = new Schema({
    docIdentidad:String,
    apellidos:String,
    nombres:String,
    ano:String,
    libro:String,
    acta:String
});

const Students = mongoose.model('Student',StudentsSchema);
module.exports = Students