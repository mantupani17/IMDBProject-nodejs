var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name:{type:String, required:true},
    sex:{type:String,required:true},
    DOB:{type:Date,required:true},
    bio:{
        birthIn:{type:String},
        movies:{type:Array}
    }
});

module.exports = mongoose.model('Actor', schema);
