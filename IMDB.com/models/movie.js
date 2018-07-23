var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name:{type:String,required:true},
    YOR:{type:String,required:true},
    plot:{type:Array,required:true},
    poster:{type:String,default:''},
    actors:{type:Array},
    producer:{
        _id:{type:String},
        name:{type:String}
    }
})

module.exports = mongoose.model('Movie', schema);
